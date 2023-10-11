import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import createApolloClient from '../utils/apolloClient';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN);
  const apolloClient = createApolloClient(authStorage);

  const signIn = async ({ username, password }) => {
    const response = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(response.data.authenticate.accessToken);
    apolloClient.resetStore();
    return response;
  };

  return [signIn, result];
};

export default useSignIn;
