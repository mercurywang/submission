import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import theme from '../../theme';

const sortMenu = [
  { label: 'Latest repositories', value: 'latest' },
  { label: 'Highest rated repositories', value: 'highest' },
  { label: 'Lowest rated repositories', value: 'lowest' }
];

const styles = StyleSheet.create({
  container: {
    padding: 16,
    border: 'none',
    backgroundColor: theme.colors.lightGray
  }
});

const Sort = ({ sortBy }) => {
  const [selected, setSelected] = useState();

  const handleValueChange = (itemValue) => {
    setSelected(itemValue);
    sortBy(itemValue);
  };

  return (
    <Picker
      style={styles.container}
      selectedValue={selected}
      onValueChange={handleValueChange}
    >
      {sortMenu.map((item, idx) => (
        <Picker.Item label={item.label} value={item.value} key={idx} />
      ))}
    </Picker>
  );
};

export default Sort;
