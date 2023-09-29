import { View, StyleSheet } from 'react-native';
import Expression from './Expression';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 0,
    justifyContent: 'space-between'
  }
});

const Review = ({ stars, forks, reviews, rating }) => {
  return (
    <View style={styles.container}>
      <Expression main={stars} sub="Stars" align="alignCenter" />
      <Expression main={forks} sub="Forks" align="alignCenter" />
      <Expression main={reviews} sub="Review" align="alignCenter" />
      <Expression main={rating} sub="Rating" align="alignCenter" />
    </View>
  );
};

export default Review;
