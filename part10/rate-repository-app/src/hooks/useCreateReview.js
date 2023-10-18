import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({
    ownerName,
    repositoryName,
    rating,
    review
  }) => {
    const response = await mutate({
      variables: { ownerName, repositoryName, rating, text: review }
    });
    return response;
  };

  return [createReview, result];
};

export default useCreateReview;
