import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

export default function Post() {
  const { postId } = useParams();
  const posts = useSelector(({ posts }) => posts.list);
  const [thePost, setThePost] = useState({ title: '' });

  useEffect(() => {
    let post = posts.filter((post) => post.id === postId);
    if (post.length > 0) setThePost(post[0]);
  }, [posts, postId]);

  const { title, body, author } = thePost;
  return (
    <div>
      <h2> {title}</h2>
      <h2>{body}</h2>
      <h3>{author}</h3>
    </div>
  );
}
