import { Link } from 'react-router-dom';
import { getPosterUrl } from '../utils/image';
import { PosterImage } from './PosterImage';

export function PosterFan({ movies }) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="poster-fan" aria-label="Trending movie posters">
      {movies.slice(0, 5).map((movie, index) => {
        const posterUrl = getPosterUrl(movie.poster_path, 'w500');
        return (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className={`poster-fan__card poster-fan__card--${index}`}
            aria-label={movie.title || 'View movie details'}
          >
            <PosterImage
              src={posterUrl}
              alt={`${movie.title || 'Movie'} poster`}
              className="poster-fan__img"
            />
          </Link>
        );
      })}
    </div>
  );
}
