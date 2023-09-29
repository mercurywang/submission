import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  inputContainer: {
    padding: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4
  },
  borderGray: {
    borderColor: theme.colors.borderGray
  },
  borderRed: {
    borderColor: theme.colors.red
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.inputContainer,
    error ? styles.borderRed : styles.borderGray,
    style
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
