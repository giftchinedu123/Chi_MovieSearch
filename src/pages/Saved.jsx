import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { PosterImage } from '../components/PosterImage';
import { useSavedMovies } from '../context/SavedMoviesContext';
import { formatYear } from '../utils/formatters';
import { getPosterUrl } from '../utils/image';

export function Saved() {
  const { savedMovies, removeMovie } = useSavedMovies();

  return (
    <div className="page-section">
      <div className="saved-page__header">
        <h1 className="page-title">Saved Movies</h1>
      </div>

      {savedMovies.length === 0 ? (
        <EmptyState
          icon="fa-regular fa-bookmark"
          title="No saved movies yet"
          message="No saved movies yet. Save one from its details page."
          actionLabel="Explore Movies"
          actionTo="/"
        />
      ) : (
        <ul className="saved-list" aria-label="Saved movies list">
          {savedMovies.map((movie) => {
            const posterUrl = getPosterUrl(movie.poster_path, 'w185');
            const year = formatYear(movie.release_date);

            return (
              <li key={movie.id} className="saved-row frosted-row">
                <Link to={`/movie/${movie.id}`} className="saved-row__link">
                  <div className="saved-row__thumb">
                    <PosterImage
                      src={posterUrl}
                      alt={`${movie.title} poster`}
                      className="saved-row__img"
                    />
                  </div>
                  <div className="saved-row__info">
                    <span className="saved-row__title">{movie.title}</span>
                    {year !== 'N/A' && <span className="saved-row__year">{year}</span>}
                  </div>
                </Link>

                <button
                  type="button"
                  className="saved-row__remove"
                  aria-label={`Remove ${movie.title} from saved movies`}
                  title="Remove from saved"
                  onClick={() => removeMovie(movie.id)}
                >
                  <i className="fa-solid fa-trash" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
