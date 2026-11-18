import { useMemo } from 'react';
import { getTrendingMoviesUrl } from '../utils/tmdb';
import { useFetch } from './useFetch';

export function useTrendingMovies() {
  const url = useMemo(() => getTrendingMoviesUrl(), []);
  const { data, loading, error, refetch } = useFetch(url);

  const movies = useMemo(() => {
    if (!data || !Array.isArray(data.results)) {
      return [];
    }
    return data.results.slice(0, 5);
  }, [data]);

  return { movies, loading, error, refetch };
}
