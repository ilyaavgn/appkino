// Utility functions for interacting with serverless functions and Vibix API.
export const callVibix = async (path) => {
  const res = await fetch(`/.netlify/functions/vibix?path=${encodeURIComponent(path)}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to fetch Vibix API');
  }
  return res.json();
};

export const searchMovies = async (page = 1, limit = 20) => {
  return callVibix(`/v1/publisher/videos/links?page=${page}&limit=${limit}`);
};

export const getMovieByKpId = async (id) => {
  return callVibix(`/v1/publisher/videos/kp/${id}`);
};

export const getMovieByImdbId = async (id) => {
  return callVibix(`/v1/publisher/videos/imdb/${id}`);
};

// createCheckoutSession function removed because subscriptions are not used
