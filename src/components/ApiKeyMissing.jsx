export function ApiKeyMissing() {
  return (
    <div className="api-missing-screen">
      <div className="api-missing-card frosted-panel">
        <div className="status-card__icon">
          <i className="fa-solid fa-key" aria-hidden="true" />
        </div>
        <h1 className="api-missing-card__title">TMDB API Key Required</h1>
        <p className="api-missing-card__lead">
          Add your free TMDB API key to start browsing trending films, search results, and movie details.
        </p>

        <ol className="api-missing-card__steps">
          <li>
            Sign up or log in at <strong>themoviedb.org</strong> and go to{' '}
            <strong>Settings &gt; API</strong> to create a free v3 API key.
          </li>
          <li>
            Create a <code>.env</code> file in the root of this project and add:
            <pre className="api-missing-card__code">VITE_TMDB_API_KEY=your_actual_api_key</pre>
          </li>
          <li>
            Restart the dev server (<code>npm run dev</code>), or add{' '}
            <code>VITE_TMDB_API_KEY</code> in your Vercel Project Settings under Environment Variables.
          </li>
        </ol>
      </div>
    </div>
  );
}
