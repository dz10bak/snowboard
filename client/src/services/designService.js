import api from './api';

export async function generateDesign({ shape, ridingStyle, graphicStyle, customText }) {
  const { data } = await api.post('/designs/generate', {
    shape,
    ridingStyle,
    graphicStyle,
    customText,
  });
  return data;
}

export async function getDesigns({ sort = 'newest', page = 1, limit = 12 } = {}) {
  const { data } = await api.get('/designs', {
    params: { sort, page, limit },
  });
  return data;
}

export async function likeDesign(id) {
  const { data } = await api.post(`/designs/${id}/like`);
  return data;
}

export async function deleteDesign(id) {
  const { data } = await api.delete(`/designs/${id}`);
  return data;
}

export async function toggleFeature(id) {
  const { data } = await api.patch(`/designs/${id}/feature`);
  return data;
}
