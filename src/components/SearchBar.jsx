import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { useMovieSearch } from '../hooks/useMovieSearch';
import { SearchDropdown } from './SearchDropdown';

const DROPDOWN_LISTBOX_ID = 'search-dropdown-listbox';

export function SearchBar({ mobileExpanded = false, onExpandMobile, onCollapseMobile }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const trimmedQuery = query.trim();
  const debouncedQuery = useDebounce(trimmedQuery, 400);
  const shouldFetch = debouncedQuery.length >= 2;

  const { results, loading, error } = useMovieSearch(shouldFetch ? debouncedQuery : '', 1);
  const visibleResults = results.slice(0, 6);
  const isDebouncing = trimmedQuery.length >= 2 && trimmedQuery !== debouncedQuery;
  const showDropdown = isOpen && trimmedQuery.length >= 2;

  useEffect(() => {
    setIsOpen(false);
    setActiveIndex(-1);
    if (onCollapseMobile) {
      onCollapseMobile();
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [debouncedQuery]);

  useEffect(() => {
    if (mobileExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mobileExpanded]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveIndex(-1);
        if (mobileExpanded && !trimmedQuery && onCollapseMobile) {
          onCollapseMobile();
        }
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [mobileExpanded, trimmedQuery, onCollapseMobile]);

  function submitFullSearch() {
    if (!trimmedQuery) {
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    setIsOpen(false);
    setActiveIndex(-1);
    if (onCollapseMobile) onCollapseMobile();
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}&page=1`);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (showDropdown && activeIndex >= 0 && visibleResults[activeIndex]) {
      const selected = visibleResults[activeIndex];
      setIsOpen(false);
      setActiveIndex(-1);
      if (onCollapseMobile) onCollapseMobile();
      navigate(`/movie/${selected.id}`);
      return;
    }
    submitFullSearch();
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
      if (onCollapseMobile) onCollapseMobile();
      if (inputRef.current) inputRef.current.blur();
      return;
    }

    if (!showDropdown || visibleResults.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % visibleResults.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? visibleResults.length - 1 : prev - 1));
    }
  }

  return (
    <div
      ref={containerRef}
      className={`search-bar ${mobileExpanded ? 'search-bar--mobile-open' : ''}`.trim()}
    >
      {!mobileExpanded && (
        <button
          type="button"
          className="search-bar__mobile-trigger"
          aria-label="Open search"
          onClick={onExpandMobile}
        >
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
        </button>
      )}

      <form className="search-bar__form" onSubmit={handleFormSubmit} role="search">
        <button
          type="submit"
          className="search-bar__submit"
          aria-label="Search movies"
        >
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
        </button>

        <input
          ref={inputRef}
          type="search"
          className="search-bar__input"
          placeholder="Search movies…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (trimmedQuery.length >= 2) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-label="Search movies"
          aria-expanded={showDropdown}
          aria-controls={DROPDOWN_LISTBOX_ID}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 && visibleResults[activeIndex]
              ? `search-option-${visibleResults[activeIndex].id}`
              : undefined
          }
        />

        {query && (
          <button
            type="button"
            className="search-bar__clear"
            aria-label="Clear search query"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              setActiveIndex(-1);
              if (inputRef.current) inputRef.current.focus();
            }}
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        )}

        {mobileExpanded && (
          <button
            type="button"
            className="search-bar__mobile-close"
            aria-label="Close search"
            onClick={() => {
              setIsOpen(false);
              setActiveIndex(-1);
              if (onCollapseMobile) onCollapseMobile();
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {showDropdown && (
        <SearchDropdown
          id={DROPDOWN_LISTBOX_ID}
          results={visibleResults}
          loading={loading || isDebouncing}
          error={error}
          query={query}
          activeIndex={activeIndex}
          onHoverIndex={setActiveIndex}
          onSelectMovie={() => {
            setIsOpen(false);
            setActiveIndex(-1);
            if (onCollapseMobile) onCollapseMobile();
          }}
        />
      )}
    </div>
  );
}
