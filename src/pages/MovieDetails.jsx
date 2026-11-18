import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loader } from '../components/Loader';
import { MovieCard } from '../components/MovieCard';
import { PosterImage } from '../components/PosterImage';
import { SaveButton } from '../components/SaveButton';
import { useMovieDetails } from '../hooks/useMovieDetails';
import {
  formatFullDate,
  formatRating,
  formatRuntime,
  formatVoteCount,
  formatYear,
} from '../utils/formatters';
import { getPosterUrl, getProfileUrl } from '../utils/image';

export function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);

  const {
    movie,
    cast,
    director,
    trailer,
    similar,
    loading,
    error,
    notFound,
    refetch,
  } = useMovieDetails(id);

  useEffect(() => {
    setShowTrailer(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [id]);

  if (loading) {
    return (
      <div className="page-section">
        <Loader variant="details" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="page-section">
        <EmptyState
          icon="fa-solid fa-film"
          title="Movie not found"
          message="The movie you are looking for does not exist or could not be found."
          actionLabel="Back to Home"
          actionTo="/"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-section">
        <ErrorMessage
          title="Could not load movie details"
          message={error.message}
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const posterUrl = getPosterUrl(movie.poster_path, 'w780') || getPosterUrl(movie.poster_path, 'w500');
  const year = formatYear(movie.release_date);
  const rating = formatRating(movie.vote_average);
  const voteCount = formatVoteCount(movie.vote_count);
  const runtime = formatRuntime(movie.runtime);
  const fullDate = formatFullDate(movie.release_date);

  return (
    <div className="details-page">
      <div className="details-page__toolbar">
        <button
          type="button"
          className="pill-btn pill-btn--ghost"
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          <span>Back</span>
        </button>

        <SaveButton movie={movie} />
      </div>

      <section className="details-hero frosted-panel">
        <div className="details-hero__poster">
          <PosterImage
            src={posterUrl}
            alt={`${movie.title} poster`}
            className="details-hero__img"
            loading="eager"
          />
        </div>

        <div className="details-hero__info">
          <h1 className="details-hero__title">
            {movie.title}{' '}
            {year !== 'N/A' && <span className="details-hero__year">({year})</span>}
          </h1>

          {movie.tagline && <p className="details-hero__tagline">&ldquo;{movie.tagline}&rdquo;</p>}

          <div className="details-hero__meta">
            <span className="details-hero__rating">
              <i className="fa-solid fa-star star-icon" aria-hidden="true" />
              <strong className="tabular-nums">{rating}/10</strong>
              <span className="details-hero__votes tabular-nums">({voteCount})</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{runtime}</span>
            <span aria-hidden="true">·</span>
            <span>{fullDate}</span>
          </div>

          {Array.isArray(movie.genres) && movie.genres.length > 0 && (
            <div className="details-hero__genres" aria-label="Genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre-pill">
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <div className="details-hero__overview-block">
            <h2 className="details-hero__subheading">Overview</h2>
            <p className="details-hero__overview">
              {movie.overview || 'No overview available for this movie.'}
            </p>
          </div>

          {director && (
            <div className="details-hero__director">
              <span className="details-hero__director-label">Director</span>
              <span className="details-hero__director-name">{director.name}</span>
            </div>
          )}

          {trailer && (
            <div className="details-hero__trailer-actions">
              <button
                type="button"
                className="pill-btn pill-btn--outline"
                onClick={() => setShowTrailer((prev) => !prev)}
                aria-expanded={showTrailer}
              >
                <i
                  className={showTrailer ? 'fa-solid fa-xmark' : 'fa-brands fa-youtube'}
                  aria-hidden="true"
                />
                <span>{showTrailer ? 'Hide Trailer' : 'Watch Official Trailer'}</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {trailer && showTrailer && (
        <section className="details-section frosted-panel trailer-panel" aria-label="Official Trailer">
          <div className="trailer-panel__header">
            <h2 className="section-title">{trailer.name || 'Official Trailer'}</h2>
          </div>
          <div className="trailer-embed">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name || `${movie.title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {cast.length > 0 && (
        <section className="details-section" aria-labelledby="cast-heading">
          <h2 id="cast-heading" className="section-title">
            Top Cast
          </h2>
          <div className="cast-grid">
            {cast.map((person) => {
              const profileUrl = getProfileUrl(person.profile_path, 'w185');
              return (
                <div key={person.credit_id || person.id} className="cast-card frosted-card">
                  <div className="cast-card__photo">
                    <PosterImage
                      src={profileUrl}
                      alt={person.name}
                      className="cast-card__img"
                      iconClass="fa-solid fa-user"
                    />
                  </div>
                  <div className="cast-card__info">
                    <span className="cast-card__name">{person.name}</span>
                    {person.character && (
                      <span className="cast-card__character">{person.character}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {similar.length > 0 && (
        <section className="details-section" aria-labelledby="similar-heading">
          <h2 id="similar-heading" className="section-title">
            Similar Movies
          </h2>
          <div className="movie-grid movie-grid--similar">
            {similar.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
