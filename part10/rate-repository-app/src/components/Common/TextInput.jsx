import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  border: {
    borderStyle: 'solid'
  }
});

const TextInput = ({ style, ...props }) => {
  const textInputStyle = [styles.border, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
