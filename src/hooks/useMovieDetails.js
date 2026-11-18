import { useMemo } from 'react';
import { getMovieDetailsUrl } from '../utils/tmdb';
import { useFetch } from './useFetch';

export function useMovieDetails(id) {
  const validId = id && /^\d+$/.test(String(id).trim()) ? String(id).trim() : null;

  const url = useMemo(() => {
    if (!validId) return null;
    return getMovieDetailsUrl(validId);
  }, [validId]);

  const { data, loading, error, refetch } = useFetch(url);

  const parsed = useMemo(() => {
    if (!data) {
      return {
        cast: [],
        director: null,
        trailer: null,
        similar: [],
      };
    }

    const cast = Array.isArray(data.credits?.cast) ? data.credits.cast.slice(0, 8) : [];
    const crew = Array.isArray(data.credits?.crew) ? data.credits.crew : [];
    const director = crew.find((person) => person.job === 'Director') || null;

    const videos = Array.isArray(data.videos?.results) ? data.videos.results : [];
    const trailer =
      videos.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube' && video.official
      ) ||
      videos.find((video) => video.type === 'Trailer' && video.site === 'YouTube') ||
      null;

    const similar = Array.isArray(data.similar?.results)
      ? data.similar.results.slice(0, 6)
      : [];

    return { cast, director, trailer, similar };
  }, [data]);

  const notFound = !validId || error?.status === 404;

  return {
    movie: data,
    cast: parsed.cast,
    director: parsed.director,
    trailer: parsed.trailer,
    similar: parsed.similar,
    loading: validId ? loading : false,
    error: validId ? error : null,
    notFound,
    refetch,
  };
}
