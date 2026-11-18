import { Link } from 'react-router-dom';
import { formatRating, formatYear } from '../utils/formatters';
import { getPosterUrl } from '../utils/image';
import { PosterImage } from './PosterImage';

export function MovieCard({ movie }) {
  const posterUrl = getPosterUrl(movie.poster_path, 'w500');
  const year = formatYear(movie.release_date);
  const rating = formatRating(movie.vote_average);

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card frosted-card">
      <div className="movie-card__poster">
        <PosterImage
          src={posterUrl}
          alt={`${movie.title || 'Movie'} poster`}
          className="movie-card__img"
        />
      </div>
      <div className="movie-card__body">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__meta">
          <span>{year}</span>
          <span aria-hidden="true">·</span>
          <span className="movie-card__rating">
            <i className="fa-solid fa-star star-icon" aria-hidden="true" />
            <span className="tabular-nums">{rating}/10</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
