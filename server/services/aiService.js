const axios = require('axios');

const POLL_INTERVAL_MS = 2000;
const MAX_POLL_DURATION_MS = 90000;
const IMAGE_WIDTH = 768;
const IMAGE_HEIGHT = 1024;
const GUIDANCE = 7.5;
const STEPS = 30;

let defaultModel = null;

const getClient = () => axios.create({
  baseURL: process.env.DEAPI_BASE_URL || 'https://api.deapi.ai',
  headers: {
    'Authorization': `Bearer ${process.env.DEAPI_API_KEY}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

async function fetchAvailableModels() {
  try {
    const client = getClient();
    const { data } = await client.get('/api/v1/client/models', {
      params: { 'filter[inference_types]': 'txt2img', per_page: 10 },
    });
    const models = data.data || [];
    if (models.length > 0) {
      defaultModel = models[0].slug;
      console.log(`AI model auto-detected: ${defaultModel}`);
      console.log(`Available models: ${models.map(m => m.slug).join(', ')}`);
    } else {
      console.warn('No txt2img models found, will use fallback');
    }
  } catch (error) {
    console.error('Failed to fetch AI models:', error.message);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateSnowboardDesign(prompt) {
  const client = getClient();
  const model = defaultModel || 'flux-dev';

  const { data: submitResponse } = await client.post('/api/v1/client/txt2img', {
    prompt,
    model,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    guidance: GUIDANCE,
    steps: STEPS,
    seed: Math.floor(Math.random() * 2147483647),
  });

  const requestId = submitResponse?.data?.request_id;
  if (!requestId) {
    throw Object.assign(new Error('No request_id returned from AI service'), { statusCode: 502 });
  }

  console.log(`AI generation started: ${requestId}`);

  const startTime = Date.now();

  while (Date.now() - startTime < MAX_POLL_DURATION_MS) {
    await sleep(POLL_INTERVAL_MS);

    const { data: statusResponse } = await client.get(
      `/api/v1/client/request-status/${requestId}`
    );

    const { status, result_url } = statusResponse.data;

    if (status === 'done' && result_url) {
      console.log(`AI generation complete: ${requestId}`);
      return result_url;
    }

    if (status === 'error') {
      throw Object.assign(
        new Error(`AI generation failed for request ${requestId}`),
        { statusCode: 502 }
      );
    }
  }

  throw Object.assign(
    new Error(`AI generation timed out after ${MAX_POLL_DURATION_MS / 1000}s`),
    { statusCode: 504 }
  );
}

module.exports = { generateSnowboardDesign, fetchAvailableModels };
