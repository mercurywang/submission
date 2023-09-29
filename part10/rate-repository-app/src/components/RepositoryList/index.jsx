import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from '../RepositoryItem/index';
import repositories from './data.json';

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => {
  return <RepositoryItem {...item} />;
};

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

export default RepositoryList;
