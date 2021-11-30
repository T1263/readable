import { useState } from 'react';
import css from './List.module.css';
export default function List({ categories }) {
  const [active, setActive] = useState('all');
  const Category = ({ name }) => {
    return (
      <li
        className={active === name ? css.active : ''}
        onClick={() => {
          setActive(name);
        }}
      >
        {name}
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
