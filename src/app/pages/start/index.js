import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CategoriesList from '../../../features/categories/List';
import PostsList from '../../../features/posts/List';
import css from './Start.module.css';

export default function Start() {
  const posts = useSelector(({ posts }) => posts.list);
  const categories = useSelector(({ categories }) =>
    [
      ...categories.list,
      // Append To select all
      { name: 'all', path: 'all' },
    ].reverse()
  );
  const [filteredPosts, setfilteredPosts] = useState([]);
  const filterBy = (category) => {
    if (category === 'all') {
      setfilteredPosts(posts);
      return;
    }
    const filtered = posts.filter((post) => post.category === category);
    setfilteredPosts(filtered);
  };

  useEffect(() => {
    setfilteredPosts(posts);
  }, [posts]);
  return (
    <div className={css.start}>
      <CategoriesList categories={categories} filterBy={filterBy} />
      <PostsList posts={filteredPosts} />
    </div>
  );
}
