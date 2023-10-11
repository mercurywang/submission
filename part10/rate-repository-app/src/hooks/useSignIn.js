import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import useMe from './useMe';

const useSignIn = () => {
  const { client } = useMe();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const response = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(response.data.authenticate.accessToken);
    await client.resetStore();
    return response;
  };

  return [signIn, result];
};

export default useSignIn;
