const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/';

export function getPosterUrl(path, size = 'w500') {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}${size}${path}`;
}

export function getBackdropUrl(path, size = 'w780') {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}${size}${path}`;
}

export function getProfileUrl(path, size = 'w185') {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}${size}${path}`;
}
