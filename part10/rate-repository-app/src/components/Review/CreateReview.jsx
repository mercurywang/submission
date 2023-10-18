import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Text from '../Common/Text';
import FormikTextInput from '../Common/FormikTextInput';
import theme from '../../theme';
import useCreateReview from '../../hooks/useCreateReview';

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

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  review: ''
};

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput
        style={styles.marginTop}
        name="repositoryName"
        placeholder="Repository name"
      />
      <FormikTextInput
        style={styles.marginTop}
        inputMode="numeric"
        name="rating"
        placeholder="Rating"
      />
      <FormikTextInput
        multiline
        style={styles.marginTop}
        name="review"
        placeholder="Review"
      />
      <Pressable style={styles.buttonContainer} onPress={onSubmit}>
        <Text style={styles.button}>Create A Review</Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().required('Rating is required')
});

export const CreateReviewContainer = ({ navigate, createReview }) => {
  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, review } = values;

    try {
      await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        review
      });
      const repositoryId = `/${ownerName}.${repositoryName}`;
      navigate(repositoryId);
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
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  return (
    <CreateReviewContainer navigate={navigate} createReview={createReview} />
  );
};

export default CreateReview;
