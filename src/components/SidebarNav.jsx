import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: 'fa-solid fa-house', end: true },
  { to: '/search', label: 'Search', icon: 'fa-solid fa-magnifying-glass', end: false },
  { to: '/saved', label: 'Saved', icon: 'fa-solid fa-bookmark', end: false },
];

export function SidebarNav() {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            aria-label={item.label}
            title={item.label}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`.trim()
            }
          >
            <span className="sidebar__icon-circle">
              <i className={item.icon} aria-hidden="true" />
            </span>
            <span className="sidebar__label">{item.label}</span>
          </NavLink>
        ))}

        <div className="sidebar__profile" aria-label="User profile Gift">
          <span className="sidebar__avatar" aria-hidden="true">
            <i className="fa-solid fa-face-laugh-wink" />
          </span>
          <span className="sidebar__profile-name">Gift</span>
        </div>
      </nav>
    </aside>
  );
}
