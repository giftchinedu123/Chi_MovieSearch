const TMDB_MAX_PAGES = 500;

function buildPageWindow(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = [1];
  const windowStart = Math.max(2, currentPage - 1);
  const windowEnd = Math.min(totalPages - 1, currentPage + 1);

  if (windowStart > 2) {
    pages.push('ellipsis-left');
  }

  for (let page = windowStart; page <= windowEnd; page += 1) {
    pages.push(page);
  }

  if (windowEnd < totalPages - 1) {
    pages.push('ellipsis-right');
  }

  pages.push(totalPages);
  return pages;
}

export function Pagination({ currentPage, totalPages, onPageChange }) {
  const clampedTotal = Math.min(Number(totalPages) || 0, TMDB_MAX_PAGES);
  const safeCurrent = Math.max(1, Math.min(Number(currentPage) || 1, clampedTotal));

  if (clampedTotal <= 1) {
    return null;
  }

  const pages = buildPageWindow(safeCurrent, clampedTotal);

  function handleSelectPage(nextPage) {
    if (nextPage === safeCurrent || nextPage < 1 || nextPage > clampedTotal) {
      return;
    }
    onPageChange(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <nav className="pagination" aria-label="Search results pagination">
      <button
        type="button"
        className="pagination__btn pagination__btn--nav"
        onClick={() => handleSelectPage(safeCurrent - 1)}
        disabled={safeCurrent <= 1}
        aria-label="Previous page"
      >
        <i className="fa-solid fa-chevron-left" aria-hidden="true" />
        <span>Prev</span>
      </button>

      <div className="pagination__pages">
        {pages.map((item) => {
          if (typeof item === 'string') {
            return (
              <span key={item} className="pagination__ellipsis" aria-hidden="true">
                …
              </span>
            );
          }

          const isCurrent = item === safeCurrent;
          return (
            <button
              key={item}
              type="button"
              className={`pagination__btn tabular-nums ${
                isCurrent ? 'pagination__btn--active' : ''
              }`.trim()}
              onClick={() => handleSelectPage(item)}
              aria-current={isCurrent ? 'page' : undefined}
              aria-label={`Page ${item}`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="pagination__btn pagination__btn--nav"
        onClick={() => handleSelectPage(safeCurrent + 1)}
        disabled={safeCurrent >= clampedTotal}
        aria-label="Next page"
      >
        <span>Next</span>
        <i className="fa-solid fa-chevron-right" aria-hidden="true" />
      </button>
    </nav>
  );
}
