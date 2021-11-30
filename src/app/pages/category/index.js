import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import PostsWrapper from '../../../features/PostsWrapper';
export default function Categories() {
  const { category } = useParams();
  const [posts, categories] = useSelector(({ posts, categories }) => [
    posts.list,
    categories.list,
  ]);
  const [thePosts, setThePosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (posts.length > 0) {
      const filteredPost = posts.filter((post) => post.category === category);
      const filteredCat = categories.find((cat) => cat.name === category);

      if (filteredPost.length > 0 || filteredCat) {
        setThePosts(filteredPost);
      } else {
        navigate('/its/not/found');
      }
    }
  }, [posts, category, navigate, categories]);
  return <PostsWrapper posts={thePosts} categories={categories} />;
}
