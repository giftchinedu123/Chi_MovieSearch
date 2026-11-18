import { useCallback, useEffect, useState } from 'react';
import { fetchFromTmdbUrl } from '../utils/tmdb';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  const refetch = useCallback(() => {
    setReloadToken((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return undefined;
    }

    const controller = new AbortController();
    let isActive = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFromTmdbUrl(url, controller.signal);
        if (isActive) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (err?.name === 'AbortError') {
          return;
        }
        if (isActive) {
          setError(err);
          setData(null);
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [url, reloadToken]);

  return { data, loading, error, refetch };
}
