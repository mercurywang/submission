import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingTop: 36,
    paddingBottom: 24,
    backgroundColor: theme.colors.appBar
  }
});

const AppBar = (props) => {
  return (
    <View style={styles.container}>
      <AppBarTab {...props} />
    </View>
  );
};

export default AppBar;
