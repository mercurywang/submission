import { View, StyleSheet, Pressable } from 'react-native';
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
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    paddingTop: 0,
    backgroundColor: theme.colors.white
  },
  buttonContainer: {
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    padding: 12,
    flex: 1,
    marginLeft: 4,
    marginRight: 4
  },
  button: {
    textAlign: 'center',
    color: theme.colors.white
  },
  buttonRed: {
    backgroundColor: theme.colors.red
  }
});

const ReviewItem = ({ review, navigate, withAction, deleteReview }) => {
  const date = format(new Date(review.createdAt), 'MM/dd/yyyy');

  return (
    <View>
      <View style={styles.reviewContainer}>
        <View style={styles.rate}>
          <Text style={styles.rateText} color="primary" fontWeight="bold">
            {review.rating}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.marginBottom} fontWeight="bold">
            {review.title}
          </Text>
          <Text style={styles.marginBottom} color="textGray">
            {date}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {withAction && (
        <View style={styles.buttonBox}>
          <Pressable style={styles.buttonContainer} onPress={navigate}>
            <Text style={styles.button} fontWeight="bold">
              View Repository
            </Text>
          </Pressable>
          <Pressable
            style={{ ...styles.buttonContainer, ...styles.buttonRed }}
            onPress={deleteReview}
          >
            <Text style={styles.button} fontWeight="bold">
              Delete Review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
