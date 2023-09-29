import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import Text from '../Common/Text';
import FormikTextInput from '../Common/FormikTextInput';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.white
  },
  inputContainer: {
    padding: 12,
    borderStyle: 'solid',
    borderColor: theme.colors.borderGray,
    borderWidth: 1,
    borderRadius: 4
  },
  password: {
    marginTop: 16
  },
  buttonContainer: {
    borderRadius: 4,
    marginTop: 16,
    backgroundColor: theme.colors.primary,
    padding: 8
  },
  button: {
    textAlign: 'center',
    color: theme.colors.white
  }
});

const initialValues = { username: '', password: '' };

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <FormikTextInput name="username" placeholder="Username" />
      </View>
      <View style={[styles.inputContainer, styles.password]}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <Pressable style={styles.buttonContainer} onPress={onSubmit}>
        <Text style={styles.button}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
