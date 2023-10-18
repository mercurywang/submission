import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Text from '../Common/Text';
import FormikTextInput from '../Common/FormikTextInput';
import theme from '../../theme';
import useSignUp from '../../hooks/useSignUp';
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

const initialValues = { username: '', password: '', passwordConfirmation: '' };

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        style={styles.marginTop}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <FormikTextInput
        style={styles.marginTop}
        name="passwordConfirm"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <Pressable style={styles.buttonContainer} onPress={onSubmit}>
        <Text style={styles.button}>Sign Up</Text>
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
    .required(MESSAGE.PASSWORD.REQUIRED),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required(MESSAGE.PASSWORD_CONFIRM.REQUIRED)
});

export const SignUpContainer = ({ navigate, signUp }) => {
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      navigate('/signIn');
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
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();

  return <SignUpContainer navigate={navigate} signUp={signUp} />;
};

export default SignUp;
