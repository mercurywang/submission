import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Text from '../Common/Text';
import FormikTextInput from '../Common/FormikTextInput';
import theme from '../../theme';
import useSignIn from '../../hooks/useSignIn';
import {
  MAX_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
  MESSAGE,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH
} from '../../utils/const';

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
    <View style={styles.container} testID="signInForm">
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
    .min(MIN_USERNAME_LENGTH, MESSAGE.USERNAME.MIN)
    .max(MAX_USERNAME_LENGTH, MESSAGE.USERNAME.MAX)
    .required(MESSAGE.USERNAME.REQUIRED),
  password: yup
    .string()
    .min(MIN_PASSWORD_LENGTH, MESSAGE.PASSWORD.HINT)
    .max(MAX_PASSWORD_LENGTH, MESSAGE.PASSWORD.HINT)
    .required(MESSAGE.PASSWORD.REQUIRED)
});

export const SignInContainer = ({ navigate, signIn }) => {
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate();
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

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  return <SignInContainer navigate={() => navigate('/')} signIn={signIn} />;
};

export default SignIn;
