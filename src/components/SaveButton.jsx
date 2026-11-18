import { useSavedMovies } from '../context/SavedMoviesContext';

export function SaveButton({ movie }) {
  const { isSaved, toggleSave } = useSavedMovies();

  if (!movie || !movie.id) {
    return null;
  }

  const saved = isSaved(movie.id);

  return (
    <button
      type="button"
      className={`pill-btn pill-btn--primary save-btn ${saved ? 'save-btn--saved' : ''}`.trim()}
      onClick={() => toggleSave(movie)}
      aria-pressed={saved}
    >
      <i
        className={saved ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}
        aria-hidden="true"
      />
      <span>{saved ? 'Saved' : 'Save'}</span>
    </button>
  );
}
