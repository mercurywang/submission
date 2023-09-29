import { Image, View, StyleSheet } from 'react-native';
import Expression from './Expression';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  tinyLogo: {
    width: 48,
    height: 48,
    borderRadius: 5
  },
  instruction: {
    paddingLeft: 16,
    paddingTop: 4
  },
  paddingTop: {
    paddingTop: 8
  }
});

const Title = ({ avatar, name, description }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: avatar
        }}
      />
      <View style={styles.instruction}>
        <Expression main={name} sub={description} align="alignStart" />
      </View>
    </View>
  );
};

export default Title;
