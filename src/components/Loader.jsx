export function Loader({ variant = 'grid', count = 8 }) {
  if (variant === 'fan') {
    return (
      <div className="skeleton-fan" aria-label="Loading trending posters">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className={`skeleton-box skeleton-fan__item skeleton-fan__item--${index}`} />
        ))}
      </div>
    );
  }

  if (variant === 'rows') {
    return (
      <div className="skeleton-rows" aria-label="Loading movie ratings">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="skeleton-row frosted-row">
            <div className="skeleton-box skeleton-row__thumb" />
            <div className="skeleton-box skeleton-row__text" />
            <div className="skeleton-box skeleton-row__score" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className="featured-card frosted-panel skeleton-featured" aria-label="Loading featured movie">
        <div className="skeleton-box skeleton-featured__media" />
        <div className="skeleton-featured__body">
          <div className="skeleton-box skeleton-featured__title" />
          <div className="skeleton-box skeleton-featured__meta" />
          <div className="skeleton-box skeleton-featured__line" />
          <div className="skeleton-box skeleton-featured__line skeleton-featured__line--short" />
          <div className="skeleton-box skeleton-featured__btn" />
        </div>
      </div>
    );
  }

  if (variant === 'details') {
    return (
      <div className="details-skeleton" aria-label="Loading movie details">
        <div className="details-skeleton__hero">
          <div className="skeleton-box details-skeleton__poster" />
          <div className="details-skeleton__info">
            <div className="skeleton-box details-skeleton__title" />
            <div className="skeleton-box details-skeleton__sub" />
            <div className="skeleton-box details-skeleton__line" />
            <div className="skeleton-box details-skeleton__line" />
            <div className="skeleton-box details-skeleton__line details-skeleton__line--short" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-grid" aria-label="Loading movies">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="movie-card frosted-card skeleton-card">
          <div className="skeleton-box skeleton-card__poster" />
          <div className="movie-card__body">
            <div className="skeleton-box skeleton-card__title" />
            <div className="skeleton-box skeleton-card__meta" />
          </div>
        </div>
      ))}
    </div>
  );
}
