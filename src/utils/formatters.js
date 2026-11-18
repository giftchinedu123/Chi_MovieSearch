export function formatYear(releaseDate) {
  if (!releaseDate || typeof releaseDate !== 'string') {
    return 'N/A';
  }
  const year = releaseDate.slice(0, 4);
  return /^\d{4}$/.test(year) ? year : 'N/A';
}

export function formatRating(voteAverage) {
  const num = Number(voteAverage);
  if (!Number.isFinite(num) || num <= 0) {
    return '0.0';
  }
  return num.toFixed(1);
}

export function formatRuntime(minutes) {
  const total = Number(minutes);
  if (!Number.isFinite(total) || total <= 0) {
    return 'Runtime N/A';
  }
  const hours = Math.floor(total / 60);
  const mins = total % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export function formatVoteCount(count) {
  const num = Number(count);
  if (!Number.isFinite(num) || num <= 0) {
    return 'No votes';
  }
  return `${num.toLocaleString()} votes`;
}

export function formatFullDate(releaseDate) {
  if (!releaseDate || typeof releaseDate !== 'string') {
    return 'Release date unavailable';
  }
  const parsed = new Date(releaseDate);
  if (Number.isNaN(parsed.getTime())) {
    return releaseDate;
  }
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
