import { useSearchParams } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loader } from '../components/Loader';
import { MovieCard } from '../components/MovieCard';
import { Pagination } from '../components/Pagination';
import { useMovieSearch } from '../hooks/useMovieSearch';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const rawPage = Number(searchParams.get('page')) || 1;
  const pageParam = Math.max(1, Math.min(rawPage, 500));

  const trimmedQuery = query.trim();

  const {
    results,
    page,
    totalPages,
    totalResults,
    loading,
    error,
    refetch,
  } = useMovieSearch(trimmedQuery, pageParam);

  function handlePageChange(nextPage) {
    setSearchParams({
      q: trimmedQuery,
      page: String(nextPage),
    });
  }

  if (!trimmedQuery) {
    return (
      <div className="page-section">
        <EmptyState
          icon="fa-solid fa-magnifying-glass"
          title="Search for a movie to get started"
          message="Type a movie title in the search bar above and press Enter to browse matching films."
        />
      </div>
    );
  }

  return (
    <div className="page-section">
      <div className="search-page__header">
        <div>
          <h1 className="page-title">Results for &ldquo;{trimmedQuery}&rdquo;</h1>
          {!loading && !error && (
            <p className="search-page__count tabular-nums">
              {totalResults.toLocaleString()} {totalResults === 1 ? 'movie' : 'movies'} found
            </p>
          )}
        </div>
      </div>

      {loading ? (
        <Loader variant="grid" count={10} />
      ) : error ? (
        <ErrorMessage
          title="Search failed"
          message={error.message}
          onRetry={refetch}
        />
      ) : results.length === 0 ? (
        <EmptyState
          icon="fa-solid fa-film"
          title="No movies found"
          message={`We couldn't find any movies matching "${trimmedQuery}". Try a different title.`}
          actionLabel="Back to Home"
          actionTo="/"
        />
      ) : (
        <>
          <div className="movie-grid">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
