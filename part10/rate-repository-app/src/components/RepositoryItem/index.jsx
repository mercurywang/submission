import { View, StyleSheet } from 'react-native';
import Title from './Title';
import theme from '../../theme';
import Language from './Language';
import Review from './Review';
import LinkageButton from './LinkageButton';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.white
  }
});

const RepositoryItem = (props) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
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
      {props.withButton && <LinkageButton label="Open in Github" />}
    </View>
  );
};

export default RepositoryItem;
