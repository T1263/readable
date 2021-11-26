import { useSelector } from 'react-redux';
import List from '../../../features/posts/List';

export default function Start() {
  const posts = useSelector(({ posts }) => posts.list);
  return (
    <div>
      <h4>Filter</h4>
      <List posts={posts} />
    </div>
  );
}
