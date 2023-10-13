import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';

import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

const useRepository = () => {
  let { repositoryId } = useParams();

  const { data, loading, refetch } = useQuery(GET_REPOSITORY_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id: repositoryId
    }
  });
  const [repository, setRepository] = useState();

  useEffect(() => {
    if (!loading && data) {
      setRepository(data?.repository);
    }
  }, [loading]);

  return { repository, loading, refetch };
};

export default useRepository;
