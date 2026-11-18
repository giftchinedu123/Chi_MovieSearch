import { Link } from 'react-router-dom';

export function EmptyState({
  icon = 'fa-solid fa-film',
  title,
  message,
  actionLabel,
  actionTo,
}) {
  return (
    <div className="status-card frosted-panel">
      <div className="status-card__icon">
        <i className={icon} aria-hidden="true" />
      </div>
      {title && <h2 className="status-card__title">{title}</h2>}
      <p className="status-card__text">{message}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="pill-btn pill-btn--primary">
          <span>{actionLabel}</span>
        </Link>
      )}
    </div>
  );
}
