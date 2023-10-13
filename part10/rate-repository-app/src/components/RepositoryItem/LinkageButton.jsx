import { Pressable, View, StyleSheet } from 'react-native';
import { openURL } from 'expo-linking';

import Text from '../Common/Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 12
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    padding: 16,
    textAlign: 'center'
  }
});

const LinkageButton = ({ label, link }) => {
  const openUrl = () => openURL(link);

  return (
    <View style={styles.container}>
      <Pressable onPress={openUrl}>
        <Text style={styles.button} color="textWhite" fontWeight="bold">
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

export default LinkageButton;
