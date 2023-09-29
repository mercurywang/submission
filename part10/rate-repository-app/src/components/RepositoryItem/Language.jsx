import { View, StyleSheet } from 'react-native';
import theme from '../../theme';
import Text from '../Common/Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    paddingLeft: 64
  },
  tag: {
    backgroundColor: theme.colors.primary,
    padding: 4,
    display: 'inline',
    borderRadius: 3
  }
});

const Language = ({ language }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tag}>
        <Text color="textWhite">{language}</Text>
      </View>
    </View>
  );
};

export default Language;
