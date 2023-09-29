import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './Bar/AppBar';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.lightGray
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar title="Repositories" />
      <RepositoryList />
    </View>
  );
};

export default Main;
