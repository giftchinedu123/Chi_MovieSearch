import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SAVED_MOVIES_KEY = 'movie_search_app_saved_movies';

const SavedMoviesContext = createContext(null);

function toMinimalMovie(movie) {
  return {
    id: movie.id,
    title: movie.title || 'Untitled Movie',
    poster_path: movie.poster_path || null,
    release_date: movie.release_date || '',
  };
}

export function SavedMoviesProvider({ children }) {
  const [savedMovies, setSavedMovies] = useLocalStorage(SAVED_MOVIES_KEY, []);

  const isSaved = useCallback(
    (movieId) => {
      const numericId = Number(movieId);
      return savedMovies.some((item) => Number(item.id) === numericId);
    },
    [savedMovies]
  );

  const toggleSave = useCallback(
    (movie) => {
      if (!movie || !movie.id) return;
      const numericId = Number(movie.id);

      setSavedMovies((prev) => {
        const exists = prev.some((item) => Number(item.id) === numericId);
        if (exists) {
          return prev.filter((item) => Number(item.id) !== numericId);
        }
        return [toMinimalMovie(movie), ...prev];
      });
    },
    [setSavedMovies]
  );

  const removeMovie = useCallback(
    (movieId) => {
      const numericId = Number(movieId);
      setSavedMovies((prev) => prev.filter((item) => Number(item.id) !== numericId));
    },
    [setSavedMovies]
  );

  const value = useMemo(
    () => ({
      savedMovies,
      isSaved,
      toggleSave,
      removeMovie,
    }),
    [savedMovies, isSaved, toggleSave, removeMovie]
  );

  return (
    <SavedMoviesContext.Provider value={value}>
      {children}
    </SavedMoviesContext.Provider>
  );
}

export function useSavedMovies() {
  const context = useContext(SavedMoviesContext);
  if (!context) {
    throw new Error('useSavedMovies must be used within a SavedMoviesProvider');
  }
  return context;
}
