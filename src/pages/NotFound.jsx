import { EmptyState } from '../components/EmptyState';

export function NotFound() {
  return (
    <div className="page-section">
      <EmptyState
        icon="fa-solid fa-compass"
        title="404 — Page not found"
        message="The page you requested could not be found."
        actionLabel="Back to Home"
        actionTo="/"
      />
    </div>
  );
}
