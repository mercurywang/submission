import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });
  const [repositories, setRepositories] = useState();

  useEffect(() => {
    if (!loading && data) {
      setRepositories(data?.repositories);
    }
  }, [loading]);

  return { repositories, loading, refetch };
};

export default useRepositories;
