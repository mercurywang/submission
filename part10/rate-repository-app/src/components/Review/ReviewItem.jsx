import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import Text from '../Common/Text';
import theme from '../../theme';

const styles = StyleSheet.create({
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
          {/* {review?.user?.username || review.repository.fullName} */}
          {review.title}
        </Text>
        <Text style={styles.marginBottom} color="textGray">
          {date}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;