import React, { useEffect, useState } from 'react';
import CategoriesList from '../categories/List';
import PostsList from '../posts/List';
import css from './PostsWrapper.module.css';
export default function PostsWrapper({ posts, categories }) {
  const [selected, setSelected] = useState('sortBy');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const handleSelection = ({ target }) => {
    if (target.value === 'Date') {
      setSelected('Date');
      let byDate = [...posts].sort((a, b) => a.timestamp - b.timestamp);
      setFilteredPosts(byDate);
    }

    if (target.value === 'Score') {
      setSelected('Score');
      let byVoteScore = [...posts].sort((a, b) => a.voteScore - b.voteScore);
      setFilteredPosts(byVoteScore);
    }
  };
  return (
    <div className={css.wrapper}>
      <div className={css.filter}>
        <h2>Filter</h2>
        <select onChange={handleSelection} value={selected} name="" id="">
          <option value="sortBy" disabled>
            Sort by:
          </option>
          <option value="Score">Score</option>
          <option value="Date">Date</option>
        </select>
      </div>
      <div className={css.lists}>
        <CategoriesList categories={categories} />
        <PostsList posts={[...filteredPosts].reverse()} />
      </div>
    </div>
  );
}
