import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';

export function TopBar() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className={`topbar ${mobileSearchOpen ? 'topbar--search-active' : ''}`.trim()}>
      <Link to="/" className="topbar__brand">
        Movie Search App
      </Link>

      <SearchBar
        mobileExpanded={mobileSearchOpen}
        onExpandMobile={() => setMobileSearchOpen(true)}
        onCollapseMobile={() => setMobileSearchOpen(false)}
      />
    </header>
  );
}
