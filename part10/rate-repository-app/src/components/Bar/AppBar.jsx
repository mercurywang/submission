import { View, StyleSheet } from 'react-native';
import theme from '../../theme';
import AppBarTab from './AppBarTab';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingTop: 64,
    paddingBottom: 24,
    backgroundColor: theme.colors.appBar,
    flexDirection: 'row'
  },
  signIn: {
    marginLeft: 8
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/">
        <AppBarTab title="Repositories" />
      </Link>
      <View style={styles.signIn}>
        <Link to="/signIn">
          <AppBarTab title="Sign In" />
        </Link>
      </View>
    </View>
  );
};

export default AppBar;
