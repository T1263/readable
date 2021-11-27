import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CategoriesList from '../../../features/categories/List';
import PostsList from '../../../features/posts/List';

export default function Start() {
  const [laoding, posts] = useSelector(({ posts }) => [
    posts.loading,
    posts.list,
  ]);
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
    <div>
      <CategoriesList categories={categories} filterBy={filterBy} />
      {laoding ? <h3>...loading.</h3> : <PostsList posts={filteredPosts} />}
    </div>
  );
}
