import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import css from './Nav.module.css';

export default function Nav() {
  const { pathname } = useLocation();
  const loading = useSelector(({ posts }) => posts.loading);
  return (
    <div className={css.nav}>
      {loading ? <h1>...loading.</h1> : <h1>Readable</h1>}

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
