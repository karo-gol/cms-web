import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const query = gql`
  {
    restricted
  }
`;

const Home = (props) => {
 
  const { data, loading, error } = useQuery(query, {fetchPolicy: 'network-only'});

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    throw new Error(error);
  }

  return (
      <div>            
        {data.restricted}          
      </div>
    );
};

export default Home;