import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApiKeyMissing } from './components/ApiKeyMissing';
import { SavedMoviesProvider } from './context/SavedMoviesContext';
import { AppLayout } from './layouts/AppLayout';
import { Home } from './pages/Home';
import { MovieDetails } from './pages/MovieDetails';
import { NotFound } from './pages/NotFound';
import { Saved } from './pages/Saved';
import { Search } from './pages/Search';
import { hasTmdbApiKey } from './utils/tmdb';

export default function App() {
  if (!hasTmdbApiKey()) {
    return <ApiKeyMissing />;
  }

  return (
    <SavedMoviesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="movie/:id" element={<MovieDetails />} />
            <Route path="saved" element={<Saved />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SavedMoviesProvider>
  );
}
