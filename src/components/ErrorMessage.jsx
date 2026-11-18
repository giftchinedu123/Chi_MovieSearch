export function ErrorMessage({
  title = 'Something went wrong',
  message = 'We could not load this data right now. Please try again.',
  onRetry,
}) {
  return (
    <div className="status-card frosted-panel" role="alert">
      <div className="status-card__icon">
        <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />
      </div>
      <h2 className="status-card__title">{title}</h2>
      <p className="status-card__text">{message}</p>
      {onRetry && (
        <button type="button" className="pill-btn pill-btn--primary" onClick={onRetry}>
          <i className="fa-solid fa-rotate-right" aria-hidden="true" />
          <span>Try again</span>
        </button>
      )}
    </div>
  );
}
