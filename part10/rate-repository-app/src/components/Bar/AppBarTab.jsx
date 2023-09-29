import { Pressable, Alert } from 'react-native';
import Text from '../Common/Text';

const AppBarTab = (props) => {
  const handlePress = () => {
    Alert.alert('pressed app bar tab');
  };

  return (
    <Pressable onPress={handlePress}>
      <Text fontWeight="bold" fontSize="subheading" color="textWhite">
        {props.title}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
