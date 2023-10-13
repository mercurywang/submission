import { FlatList, View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import useRepository from '../../hooks/useRepository';
import RepositoryItem from './index';
import Text from '../Common/Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  header: {
    marginBottom: 12
  },
  reviewContainer: {
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    padding: 12
  },
  rate: {
    height: 48,
    width: 48,
    borderColor: theme.colors.primary,
    borderWidth: 4,
    borderStyle: 'solid',
    borderRadius: 24
  },
  rateText: {
    lineHeight: 44,
    textAlign: 'center'
  },
  details: {
    flexShrink: 1,
    paddingLeft: 12
  },
  marginBottom: {
    marginBottom: 8
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem {...repository} withButton />;
};

const ReviewItem = ({ review }) => {
  const date = format(new Date(review.createdAt), 'MM/dd/yyyy');
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.rate}>
        <Text style={styles.rateText} color="primary" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.marginBottom} fontWeight="bold">
          {review.user.username}
        </Text>
        <Text style={styles.marginBottom} color="textGray">
          {date}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
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
