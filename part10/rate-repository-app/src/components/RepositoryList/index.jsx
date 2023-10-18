import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import RepositoryItem from '../RepositoryItem/index';
import useRepositories from '../../hooks/useRepositories';
import Sort from './Sort';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RenderItem = ({ item }) => {
  const navigate = useNavigate();

  const toRepositoryPage = () => {
    navigate(`/${item.id}`);
  };

  return (
    <Pressable onPress={toRepositoryPage}>
      <RepositoryItem {...item} />
    </Pressable>
  );
};

export const RepositoryListContainer = ({ repositories, sortBy }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RenderItem item={item} />}
      ListHeaderComponent={<Sort sortBy={sortBy} />}
    />
  );
};

const RepositoryList = () => {
  const [variables, setVariables] = useState();
  const { repositories } = useRepositories(variables);

  const sortBy = (by) => {
    switch (by) {
      case 'latest':
        setVariables({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
        return;
      case 'highest':
        setVariables({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' });
        return;
      case 'lowest':
        setVariables({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' });
        return;
      default:
        break;
    }
  };

  return (
    <RepositoryListContainer repositories={repositories} sortBy={sortBy} />
  );
};

export default RepositoryList;
