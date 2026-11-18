import { Link } from 'react-router-dom';
import { formatRating, formatYear } from '../utils/formatters';
import { getPosterUrl } from '../utils/image';
import { PosterImage } from './PosterImage';

export function SearchDropdown({
  id,
  results,
  loading,
  error,
  query,
  activeIndex,
  onSelectMovie,
  onHoverIndex,
}) {
  const trimmed = query.trim();

  if (trimmed.length < 2) {
    return null;
  }

  return (
    <div
      id={id}
      className="search-dropdown frosted-panel"
      role="listbox"
      aria-label="Search suggestions"
    >
      {loading ? (
        <div className="search-dropdown__state" aria-live="polite">
          <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
          <span>Searching movies…</span>
        </div>
      ) : error ? (
        <div className="search-dropdown__state" role="alert">
          <i className="fa-solid fa-circle-exclamation" aria-hidden="true" />
          <span>Unable to load suggestions.</span>
        </div>
      ) : results.length === 0 ? (
        <div className="search-dropdown__state" aria-live="polite">
          <i className="fa-solid fa-film" aria-hidden="true" />
          <span>No movies found for &ldquo;{trimmed}&rdquo;</span>
        </div>
      ) : (
        <ul className="search-dropdown__list">
          {results.slice(0, 6).map((movie, index) => {
            const isHighlighted = index === activeIndex;
            const posterUrl = getPosterUrl(movie.poster_path, 'w185');
            const year = formatYear(movie.release_date);
            const rating = formatRating(movie.vote_average);

            return (
              <li
                key={movie.id}
                id={`search-option-${movie.id}`}
                role="option"
                aria-selected={isHighlighted}
                className={`search-dropdown__item ${
                  isHighlighted ? 'search-dropdown__item--active' : ''
                }`.trim()}
                onMouseEnter={() => onHoverIndex(index)}
              >
                <Link
                  to={`/movie/${movie.id}`}
                  className="search-dropdown__link"
                  onClick={onSelectMovie}
                >
                  <div className="search-dropdown__thumb">
                    <PosterImage
                      src={posterUrl}
                      alt={`${movie.title} poster`}
                      className="search-dropdown__img"
                    />
                  </div>
                  <div className="search-dropdown__info">
                    <span className="search-dropdown__title">{movie.title}</span>
                    <span className="search-dropdown__meta">
                      <span>{year}</span>
                      <span aria-hidden="true">·</span>
                      <span className="search-dropdown__rating">
                        <i className="fa-solid fa-star star-icon" aria-hidden="true" />
                        <span>{rating}</span>
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
