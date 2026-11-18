import { useState } from 'react';

export function PosterImage({
  src,
  alt,
  className = '',
  placeholderClassName = '',
  iconClass = 'fa-solid fa-film',
  loading = 'lazy',
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`media-placeholder ${placeholderClassName}`.trim()}
        role="img"
        aria-label={alt || 'Poster unavailable'}
      >
        <i className={iconClass} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setHasError(true)}
    />
  );
}
