import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import NoteFeed from '../components/NoteFeed';
import Button from '../components/Button';

const GET_NOTES = gql`
  query noteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const Home = () => {
  useEffect(() => {
    // Обновляем заголовок документа
    document.title = 'Home page — Notedly';
  }, []);

  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  // Если данные загружаются
  if (loading) {
    return <p>Loading...</p>;
  }

  // Если при загрузке произошла ошибка
  if (error) {
    return <p>Error!</p>;
  }

  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
        <Button
          onClick={() => {
            fetchMore({
              variables: { cursor: data.noteFeed.cursor },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage, // Совмещаем новые результаты со старыми
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ],
                    __typename: 'noteFeed'
                  }
                };
              }
            });
          }}
        >
          Load more
        </Button>
      )}
    </React.Fragment>
  );
};
export default Home;
