const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export function getTmdbApiKey() {
  const raw = import.meta.env.VITE_TMDB_API_KEY;
  return typeof raw === 'string' ? raw.trim() : '';
}

export function hasTmdbApiKey() {
  const key = getTmdbApiKey();
  return Boolean(key && key !== 'your_key_here');
}

export function buildTmdbUrl(endpoint, params = {}) {
  const apiKey = getTmdbApiKey();
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = new URL(`${TMDB_BASE_URL}${normalizedEndpoint}`);

  url.searchParams.set('api_key', apiKey);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

export async function fetchFromTmdbUrl(url, signal) {
  if (!hasTmdbApiKey()) {
    const error = new Error('TMDB API key is missing. Add VITE_TMDB_API_KEY to your .env file.');
    error.status = 401;
    throw error;
  }

  const response = await fetch(url, { signal });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.status_message) {
        message = errorData.status_message;
      }
    } catch {
      // Ignore JSON parse failures on non-JSON error responses
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export function getTrendingMoviesUrl() {
  return buildTmdbUrl('/trending/movie/week');
}

export function getPopularMoviesUrl(page = 1) {
  return buildTmdbUrl('/movie/popular', { page });
}

export function getSearchMoviesUrl(query, page = 1) {
  return buildTmdbUrl('/search/movie', {
    query,
    page,
    include_adult: 'false',
  });
}

export function getMovieDetailsUrl(id) {
  return buildTmdbUrl(`/movie/${id}`, {
    append_to_response: 'credits,videos,similar',
  });
}
