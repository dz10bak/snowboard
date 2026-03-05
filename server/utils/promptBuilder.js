const shapeDescriptions = {
  'twin': 'symmetrical twin-tip board shape, balanced nose and tail',
  'directional': 'directional board shape with a distinct nose and tapered tail',
  'directional-twin': 'directional twin board shape, slightly longer nose with similar flex pattern',
  'swallowtail': 'swallowtail board shape with a split V-shaped tail cutout',
};

const ridingStyleDescriptions = {
  'park': 'playful freestyle park energy, urban and dynamic feel',
  'all-mountain': 'versatile all-mountain adventure vibe, balanced and bold',
  'freeride': 'raw freeride powder energy, wild and untamed mountain spirit',
};

const graphicStyleDescriptions = {
  'minimal': 'clean minimalist design, simple lines, muted tones, elegant negative space',
  'graffiti': 'street graffiti art style, spray paint textures, bold tags and drips, urban colors',
  'japanese': 'traditional Japanese ukiyo-e art style, waves, mountains, cherry blossoms, woodblock print aesthetic',
  'cyberpunk': 'cyberpunk neon aesthetic, futuristic circuits, glitch effects, electric blues and pinks',
  'vintage': 'retro vintage poster style, worn textures, classic typography, earthy warm palette',
  'brutal-black': 'brutal blackwork tattoo style, heavy black ink, bold linework, dark and intense patterns',
};

function buildPrompt({ shape, ridingStyle, graphicStyle, customText }) {
  const base = 'A high-quality snowboard top-sheet graphic design, flat lay top-down view, centered composition, elongated vertical snowboard proportions';
  const shapeHint = shapeDescriptions[shape] || '';
  const styleHint = ridingStyleDescriptions[ridingStyle] || '';
  const graphicHint = graphicStyleDescriptions[graphicStyle] || '';
  const custom = customText ? `, incorporating: ${customText}` : '';

  return `${base}, ${shapeHint}, ${styleHint}, ${graphicHint}${custom}, vibrant colors, professional product design, print-ready, 4K detail, no text or watermarks`;
}

module.exports = { buildPrompt };
