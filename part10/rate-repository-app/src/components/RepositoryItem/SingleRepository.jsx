import { FlatList, View, StyleSheet } from 'react-native';

import useRepository from '../../hooks/useRepository';
import RepositoryItem from './index';
import ReviewItem from '../Review/ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  header: {
    marginBottom: 12
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem {...repository} withButton />;
};

const SingleRepository = () => {
  const { repository } = useRepository();

  const reviewNodes = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      style={styles.listContainer}
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <RepositoryInfo repository={repository} />
        </View>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
