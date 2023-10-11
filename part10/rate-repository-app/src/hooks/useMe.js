import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useMe = () => {
  const { data, loading, refetch, client } = useQuery(ME);

  return { me: data?.me, loading, refetch, client };
};

export default useMe;
