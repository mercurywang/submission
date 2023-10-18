import { View, StyleSheet, ScrollView } from 'react-native';
import { Pressable } from 'react-native';
import theme from '../../theme';
import AppBarTab from './AppBarTab';
import { Link } from 'react-router-native';
import useMe from '../../hooks/useMe';
import useAuthStorage from '../../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingTop: 64,
    paddingBottom: 24,
    backgroundColor: theme.colors.appBar,
    flexDirection: 'row'
  },
  marginLeft: {
    marginLeft: 16
  },
  row: {
    flexDirection: 'row'
  }
});

const AppBar = () => {
  const { me, client } = useMe();
  const authStorage = useAuthStorage();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await client.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab title="Repositories" />
        </Link>
        <View style={styles.marginLeft}>
          {!me ? (
            <View style={styles.row}>
              <Link to="/signIn">
                <AppBarTab title="Sign In" />
              </Link>
              <Link style={styles.marginLeft} to="/signUp">
                <AppBarTab title="Sign Up" />
              </Link>
            </View>
          ) : (
            <View style={styles.row}>
              <Link to="/createReview">
                <AppBarTab title="Create A Review" />
              </Link>
              <Pressable style={styles.marginLeft} onPress={handleSignOut}>
                <AppBarTab title="Sign Out" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
