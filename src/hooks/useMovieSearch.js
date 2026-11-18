import { useMemo } from 'react';
import { getSearchMoviesUrl } from '../utils/tmdb';
import { useFetch } from './useFetch';

const TMDB_MAX_PAGES = 500;

export function useMovieSearch(query, page = 1) {
  const trimmedQuery = typeof query === 'string' ? query.trim() : '';
  const safePage = Math.max(1, Math.min(Number(page) || 1, TMDB_MAX_PAGES));

  const url = useMemo(() => {
    if (!trimmedQuery) return null;
    return getSearchMoviesUrl(trimmedQuery, safePage);
  }, [trimmedQuery, safePage]);

  const { data, loading, error, refetch } = useFetch(url);

  const results = useMemo(() => {
    if (!data || !Array.isArray(data.results)) {
      return [];
    }
    return data.results;
  }, [data]);

  const totalPages = useMemo(() => {
    const rawPages = Number(data?.total_pages) || 0;
    return Math.min(rawPages, TMDB_MAX_PAGES);
  }, [data]);

  const totalResults = Number(data?.total_results) || 0;
  const currentPage = Math.min(Number(data?.page) || safePage, Math.max(totalPages, 1));

  return {
    results,
    page: currentPage,
    totalPages,
    totalResults,
    loading,
    error,
    refetch,
  };
}
