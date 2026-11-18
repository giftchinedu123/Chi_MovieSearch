import { Link } from 'react-router-dom';
import { formatRating } from '../utils/formatters';
import { getPosterUrl } from '../utils/image';
import { PosterImage } from './PosterImage';

export function RatingRow({ movie }) {
  const posterUrl = getPosterUrl(movie.poster_path, 'w185');
  const rating = formatRating(movie.vote_average);

  return (
    <Link to={`/movie/${movie.id}`} className="rating-row frosted-row">
      <div className="rating-row__thumb">
        <PosterImage
          src={posterUrl}
          alt={`${movie.title} poster`}
          className="rating-row__img"
        />
      </div>

      <span className="rating-row__title">{movie.title}</span>

      <span className="rating-row__score" aria-label={`Rated ${rating} out of 10`}>
        <i className="fa-solid fa-star star-icon" aria-hidden="true" />
        <span className="tabular-nums">{rating}/10</span>
      </span>
    </Link>
  );
}
