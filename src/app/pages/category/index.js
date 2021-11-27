import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import PostsList from '../../../features/posts/List';
export default function Categories() {
  const { category } = useParams();
  const posts = useSelector(({ posts }) => posts.list);
  const [thePosts, setThePosts] = useState([]);

  useEffect(() => {
    const filteredPost = posts.filter((post) => post.category === category);
    setThePosts(filteredPost);
  }, [posts, category]);
  return <PostsList posts={thePosts} />;
}
