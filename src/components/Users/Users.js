import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import AddingUser from './AddingUser';

const query = gql`
  {
    restricted
  }
`;

const Users = (props) => {
 
  const { data, loading, error } = useQuery(query);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    throw new Error(error);
  }

  return (
      <div>   
        <AddingUser />         
        {data.restricted}          
      </div>
    );
};

export default Users;