import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList/index';
import AppBar from './Bar/AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SingleRepository from './RepositoryItem/SingleRepository';
import CreateReview from './Review/CreateReview.jsx';
import SignUp from './SignIn/SignUp';
import MyReviews from './Review/MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.lightGray
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/:repositoryId" element={<SingleRepository />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/createReview" element={<CreateReview />} />
        <Route path="/myReviews" element={<MyReviews />} />
      </Routes>
    </View>
  );
};

export default Main;
