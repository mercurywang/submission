import { View, StyleSheet } from 'react-native';
import Title from './Title';
import theme from '../../theme';
import Language from './Language';
import Review from './Review';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.white
  }
});

const RepositoryItem = (props) => {
  return (
    <View style={styles.container}>
      <Title
        avatar={props.ownerAvatarUrl}
        name={props.fullName}
        description={props.description}
      />
      <Language language={props.language} />
      <Review
        stars={props.stargazersCount}
        forks={props.forksCount}
        reviews={props.reviewCount}
        rating={props.ratingAverage}
      />
    </View>
  );
};

export default RepositoryItem;
