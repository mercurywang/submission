import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  });
  const [repositories, setRepositories] = useState();

  useEffect(() => {
    if (!loading && data) {
      setRepositories(data?.repositories);
    }
  }, [loading, variables]);

  return { repositories, loading, refetch };
};

export default useRepositories;
