import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  inputContainer: {
    padding: 12,
    borderStyle: 'solid',
    borderColor: theme.colors.borderGray,
    borderWidth: 1,
    borderRadius: 4
  }
});

const TextInput = ({ style, ...props }) => {
  const textInputStyle = [styles.inputContainer, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
