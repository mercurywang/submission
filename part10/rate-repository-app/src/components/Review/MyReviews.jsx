import { FlatList, View, StyleSheet, Alert } from 'react-native';

import ReviewItem from './ReviewItem';
import useMe from '../../hooks/useMe';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../../hooks/useDeleteReview';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  header: {
    marginBottom: 12
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { me, refetch } = useMe(true);
  const { deleteReviewById } = useDeleteReview();
  const navigate = useNavigate();

  const reviewNodes = me
    ? me.reviews.edges.map((edge) => ({
        title: edge.node.repository.fullName,
        ...edge.node
      }))
    : [];

  const toRepositoryPage = (item) => {
    navigate(`/${item.repository.id}`);
  };

  const deleteReview = async (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'CANCEL', style: 'cancel' },
        {
          text: 'DELETE',
          onPress: async () => {
            await deleteReviewById({ id });
            refetch();
          }
        }
      ]
    );
  };

  return (
    <FlatList
      style={styles.listContainer}
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          withAction
          navigate={() => toRepositoryPage(item)}
          deleteReview={() => deleteReview(item.id)}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
