import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReviewById = async ({ id }) => {
    const response = await mutate({
      variables: { deleteReviewId: id }
    });
    return response;
  };

  return { result, deleteReviewById };
};

export default useDeleteReview;
