import { FlatList, View, StyleSheet } from 'react-native';

import ReviewItem from './ReviewItem';
import useMe from '../../hooks/useMe';

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
  const { me } = useMe(true);

  const reviewNodes = me
    ? me.reviews.edges.map((edge) => ({
        title: edge.node.repository.fullName,
        ...edge.node
      }))
    : [];

  return (
    <FlatList
      style={styles.listContainer}
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
