import { Link, useLocation } from 'react-router-dom';
import css from './List.module.css';
export default function List({ categories }) {
  const { pathname } = useLocation();
  const Category = ({ name, path }) => {
    return (
      <li className={pathname.includes(name) ? css.active : ''}>
        <Link to={`/${path}`}>{name}</Link>
      </li>
    );
  };
  return (
    <div className={css.categories}>
      <h2 className={css.title}>Categories</h2>
      <ul className={css.list}>
        {categories.map((category) => (
          <Category key={category.path} {...category} />
        ))}
      </ul>
    </div>
  );
}
