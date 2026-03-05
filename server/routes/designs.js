const express = require('express');
const router = express.Router();
const Design = require('../models/Design');
const { generateSnowboardDesign } = require('../services/aiService');
const { buildPrompt } = require('../utils/promptBuilder');

// POST /api/designs/generate — Generate AI design + save
router.post('/generate', async (req, res, next) => {
  try {
    const { shape, ridingStyle, graphicStyle, customText } = req.body;

    if (!shape || !ridingStyle || !graphicStyle) {
      return res.status(400).json({
        success: false,
        error: 'shape, ridingStyle, and graphicStyle are required',
      });
    }

    const prompt = buildPrompt({ shape, ridingStyle, graphicStyle, customText });
    const imageUrl = await generateSnowboardDesign(prompt);

    const design = await Design.create({
      shape,
      ridingStyle,
      graphicStyle,
      customText: customText || '',
      prompt,
      imageUrl,
    });

    res.status(201).json({ success: true, design });
  } catch (error) {
    next(error);
  }
});

// GET /api/designs — Community feed
router.get('/', async (req, res, next) => {
  try {
    const { sort = 'newest', page = 1, limit = 12 } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    let sortOption = { createdAt: -1 };
    let filter = {};

    if (sort === 'popular') {
      sortOption = { likes: -1, createdAt: -1 };
    } else if (sort === 'featured') {
      filter.featured = true;
    }

    const [designs, total] = await Promise.all([
      Design.find(filter).sort(sortOption).skip(skip).limit(limitNum),
      Design.countDocuments(filter),
    ]);

    res.json({
      success: true,
      designs,
      pagination: {
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        total,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/designs/:id/like — Increment like counter
router.post('/:id/like', async (req, res, next) => {
  try {
    const design = await Design.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!design) {
      return res.status(404).json({ success: false, error: 'Design not found' });
    }

    res.json({ success: true, design });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/designs/:id — Delete design (open for demo)
router.delete('/:id', async (req, res, next) => {
  try {
    const design = await Design.findByIdAndDelete(req.params.id);

    if (!design) {
      return res.status(404).json({ success: false, error: 'Design not found' });
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/designs/:id/feature — Toggle featured (open for demo)
router.patch('/:id/feature', async (req, res, next) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({ success: false, error: 'Design not found' });
    }

    design.featured = !design.featured;
    await design.save();

    res.json({ success: true, design });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
