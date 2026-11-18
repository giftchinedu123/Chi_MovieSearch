import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loader } from '../components/Loader';
import { PosterFan } from '../components/PosterFan';
import { PosterImage } from '../components/PosterImage';
import { RatingRow } from '../components/RatingRow';
import { useFetch } from '../hooks/useFetch';
import { useTrendingMovies } from '../hooks/useTrendingMovies';
import { formatRating, formatYear } from '../utils/formatters';
import { getBackdropUrl, getPosterUrl } from '../utils/image';
import { getPopularMoviesUrl } from '../utils/tmdb';

export function Home() {
  const {
    movies: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
    refetch: refetchTrending,
  } = useTrendingMovies();

  const popularUrl = useMemo(() => getPopularMoviesUrl(1), []);
  const {
    data: popularData,
    loading: popularLoading,
    error: popularError,
    refetch: refetchPopular,
  } = useFetch(popularUrl);

  const popularMovies = useMemo(() => {
    return Array.isArray(popularData?.results) ? popularData.results : [];
  }, [popularData]);

  const [featuredIndex, setFeaturedIndex] = useState(null);

  useEffect(() => {
    if (popularMovies.length > 0 && featuredIndex === null) {
      const initialIndex = Math.floor(Math.random() * popularMovies.length);
      setFeaturedIndex(initialIndex);
    }
  }, [popularMovies, featuredIndex]);

  function handleShuffle() {
    if (popularMovies.length <= 1) return;
    setFeaturedIndex((prev) => {
      let next = Math.floor(Math.random() * popularMovies.length);
      if (next === prev) {
        next = (prev + 1) % popularMovies.length;
      }
      return next;
    });
  }

  const featuredMovie =
    featuredIndex !== null && popularMovies[featuredIndex]
      ? popularMovies[featuredIndex]
      : popularMovies[0] || null;

  const featuredImageUrl = featuredMovie
    ? getBackdropUrl(featuredMovie.backdrop_path, 'w780') ||
      getPosterUrl(featuredMovie.poster_path, 'w780')
    : null;

  return (
    <div className="home-grid">
      <div className="home-grid__left">
        <section className="home-section" aria-labelledby="trending-heading">
          <h1 id="trending-heading" className="section-title">
            Trending Movies
          </h1>

          {trendingLoading ? (
            <Loader variant="fan" />
          ) : trendingError ? (
            <ErrorMessage
              title="Could not load trending movies"
              message={trendingError.message}
              onRetry={refetchTrending}
            />
          ) : trendingMovies.length === 0 ? (
            <EmptyState
              title="No trending movies"
              message="Trending films are currently unavailable."
            />
          ) : (
            <PosterFan movies={trendingMovies} />
          )}
        </section>

        <section className="home-section" aria-labelledby="rating-heading">
          <h2 id="rating-heading" className="section-title">
            Movie Rating
          </h2>

          {trendingLoading ? (
            <Loader variant="rows" />
          ) : trendingError ? (
            <ErrorMessage
              title="Could not load movie ratings"
              message={trendingError.message}
              onRetry={refetchTrending}
            />
          ) : trendingMovies.length === 0 ? (
            <EmptyState
              title="No ratings available"
              message="Check back soon for updated movie ratings."
            />
          ) : (
            <div className="rating-list">
              {trendingMovies.map((movie) => (
                <RatingRow key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="home-grid__right" aria-labelledby="featured-heading">
        <div className="featured-header">
          <h2 id="featured-heading" className="section-title">
            Featured Pick
          </h2>
          {popularMovies.length > 1 && !popularLoading && !popularError && (
            <button
              type="button"
              className="shuffle-btn"
              onClick={handleShuffle}
              aria-label="Shuffle featured movie"
              title="Pick another random movie"
            >
              <i className="fa-solid fa-shuffle" aria-hidden="true" />
              <span>Shuffle</span>
            </button>
          )}
        </div>

        {popularLoading ? (
          <Loader variant="featured" />
        ) : popularError ? (
          <ErrorMessage
            title="Could not load featured movie"
            message={popularError.message}
            onRetry={refetchPopular}
          />
        ) : !featuredMovie ? (
          <EmptyState
            title="No featured movie"
            message="Unable to pick a random movie right now."
          />
        ) : (
          <article className="featured-card frosted-panel">
            <div className="featured-card__media">
              <PosterImage
                src={featuredImageUrl}
                alt={`${featuredMovie.title} backdrop`}
                className="featured-card__img"
              />
            </div>

            <div className="featured-card__body">
              <div className="featured-card__top">
                <h3 className="featured-card__title">
                  {featuredMovie.title}{' '}
                  <span className="featured-card__year">
                    ({formatYear(featuredMovie.release_date)})
                  </span>
                </h3>
                <div
                  className="featured-card__rating"
                  aria-label={`Rated ${formatRating(featuredMovie.vote_average)} out of 10`}
                >
                  <i className="fa-solid fa-star star-icon" aria-hidden="true" />
                  <span className="tabular-nums">
                    {formatRating(featuredMovie.vote_average)}/10
                  </span>
                </div>
              </div>

              <p className="featured-card__overview">
                {featuredMovie.overview
                  ? featuredMovie.overview
                  : 'No overview available for this movie.'}
              </p>

              <div className="featured-card__actions">
                <Link
                  to={`/movie/${featuredMovie.id}`}
                  className="pill-btn pill-btn--primary"
                >
                  <span>View details</span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        )}
      </section>
    </div>
  );
}
