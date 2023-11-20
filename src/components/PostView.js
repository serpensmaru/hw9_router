import { useState } from 'react';
import useJsonFetch from '../hooks/useJsonFetch';
import Post from './Post';
import Form from './Form';

export default function PostView({ match, history }) {
  
  const [isEdit, setEdit] = useState(false);
  const [posts] = useJsonFetch(process.env.REACT_APP_POSTS_URL, isEdit);

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_POSTS_URL}/${match.params.id}`,
      {
        method: 'DELETE',
      })
      .then(() => {
        history.push('/');
      });
  }

  const handleEdit = () => {
    setEdit(true);
  }

  const handleSubmit = (text) => {
    const fetchBody = { id: Number(match.params.id), content: text };
    fetch(process.env.REACT_APP_POSTS_URL,
      {
        method: 'POST',
        body: JSON.stringify(fetchBody),
      })
      .then(() => {
        setEdit(false);
      });
  }

  const handleClose = () => {
    setEdit(false);
  }

  return (
    <div className="PostView">
      {posts && ((
        !isEdit &&
        <div>
          <div className="PostView__close" onClick={() => history.push('/')}>×</div>
          <Post post={posts.find((post) => post.id === Number(match.params.id))} />
          <div className="PostView__edit" onClick={handleEdit}>Изменить</div>
          <div className="PostView__delete" onClick={handleDelete}>Удалить</div>
        </div>
      ) || (
          isEdit &&
          <div>
            <Form
              post={posts.find((post) => post.id === Number(match.params.id))}
              onSubmit={handleSubmit}
              onClose={handleClose}
            />
          </div>
        ))
      }
    </div>
  );
}