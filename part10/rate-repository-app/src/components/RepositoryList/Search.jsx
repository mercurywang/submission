import { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    border: 'none',
    borderRadius: 4,
    backgroundColor: theme.colors.white,
    margin: 12
  }
});

const Search = ({ searchKeyword }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [value] = useDebounce(searchQuery, 1000);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    searchKeyword(value);
  }, [value]);

  return (
    <Searchbar
      style={styles.container}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default Search;
