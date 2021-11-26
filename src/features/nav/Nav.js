import { Link, useLocation } from 'react-router-dom';
import css from './Nav.module.css';

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <div className={css.nav}>
      <h1>Logo</h1>

      <div className={css.menu}>
        <ul>
          <li className={pathname === '/' ? css.active : ''}>
            <Link to="/">Start</Link>
          </li>
          <li className={pathname === '/add' ? css.active : ''}>
            <Link to="/add">Add</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
