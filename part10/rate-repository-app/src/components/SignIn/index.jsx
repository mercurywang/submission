import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from '../Common/Text';
import FormikTextInput from '../Common/FormikTextInput';
import theme from '../../theme';
import useSignIn from '../../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.white
  },
  marginTop: {
    marginTop: 16
  },
  buttonContainer: {
    borderRadius: 4,
    marginTop: 16,
    backgroundColor: theme.colors.primary,
    padding: 12
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
      <FormikTextInput name="username" placeholder="Username" />
      <View style={styles.marginTop}>
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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'Username must be greater or equal to 4')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be between 6 and 12 digits')
    .max(12, 'Password must be between 6 and 12 digits')
    .required('Password is required')
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
