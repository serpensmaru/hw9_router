import Post from './Post';
import useJsonFetch from '../hooks/useJsonFetch';

export default function Main({ history }) {
  const [posts] = useJsonFetch(process.env.REACT_APP_POSTS_URL);
  
  const handleAdd = () => {
    history.push('/posts/new');
  }

  return (
    <div className="Main">
      <div className="Main__header">
        <button className="Main__addpost" onClick={handleAdd}>Создать пост</button>
      </div>
      {posts && posts.map((post) =>
        <Post key={post.id} post={post} />
      )}
    </div>
  );
}