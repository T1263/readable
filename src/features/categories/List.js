import { useState } from 'react';
import css from './List.module.css';
export default function List({ categories, filterBy }) {
  const [active, setActive] = useState('all');
  const Category = ({ name }) => {
    return (
      <li
        className={active === name ? css.active : ''}
        onClick={() => {
          setActive(name);
          filterBy(name);
        }}
      >
        {name}
      </li>
    );
  };
  return (
    <div className={css.filter}>
      <h2 className={css.title}>Filter</h2>
      <ul className={css.list}>
        {categories.map((category) => (
          <Category key={category.path} {...category} />
        ))}
      </ul>
    </div>
  );
}
