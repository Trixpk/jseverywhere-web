import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import DeleteNote from './DeleteNote';
import FavoriteNote from './FavoriteNote';

// Импортируем GraphQL запрос GET_ME
import { GET_ME } from '../gql/query';

const NoteUser = props => {
  const { loading, error, data } = useQuery(GET_ME);

  // Если данные загружаются, выдаем сообщение о загрузке
  if (loading) return <p>Loading...</p>;

  // Если при получении данных произошел сбой, выдаем сообщение об ошибке
  if (error) return <p>Error!</p>;

  return (
    <React.Fragment>
      <FavoriteNote
        me={data.me}
        noteId={props.note.id}
        favoriteCount={props.note.favoriteCount}
      />

      {data.me.id === props.note.author.id && (
        <React.Fragment>
          <Link to={`/edit/${props.note.id}`}>Edit</Link>
          <DeleteNote noteId={props.note.id}></DeleteNote>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NoteUser;
