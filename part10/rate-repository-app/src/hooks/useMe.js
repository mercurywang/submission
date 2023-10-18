import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useMe = (includeReviews = false) => {
  const { data, loading, refetch, client } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews }
  });

  return { me: data?.me, loading, refetch, client };
};

export default useMe;
