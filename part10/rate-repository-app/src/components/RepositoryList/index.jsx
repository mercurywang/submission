import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import RepositoryItem from '../RepositoryItem/index';
import useRepositories from '../../hooks/useRepositories';
import Sort from './Sort';
import { useState, Component } from 'react';
import Search from './Search';

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

export class RepositoryListContainer extends Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <View>
        <Search searchKeyword={props.search} />
        <Sort sortBy={props.sortBy} />
      </View>
    );
  };

  render() {
    const props = this.props;
    const repositoryNodes = props.repositories
      ? props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RenderItem item={item} />}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

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

  const search = (keyword) => {
    if (keyword) {
      setVariables({ ...variables, searchKeyword: keyword });
    }
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortBy={sortBy}
      search={search}
    />
  );
};

export default RepositoryList;
