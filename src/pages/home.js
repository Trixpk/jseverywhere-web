import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import NoteFeed from '../components/NoteFeed';
import Button from '../components/Button';
import { GET_NOTES } from '../gql/query';

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
    return <p>Error! {error}</p>;
  }

  return (
    <React.Fragment>
      <h2>Home</h2>
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
