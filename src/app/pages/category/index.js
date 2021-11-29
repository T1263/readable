import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import PostsList from '../../../features/posts/List';
export default function Categories() {
  const { category } = useParams();
  const posts = useSelector(({ posts }) => posts.list);
  const [thePosts, setThePosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (posts.length > 0) {
      const filteredPost = posts.filter((post) => post.category === category);
      if (filteredPost.length > 0) {
        setThePosts(filteredPost);
      } else {
        navigate('/its/not/found');
      }
    }
  }, [posts, category, navigate]);
  return <PostsList posts={thePosts} />;
}
