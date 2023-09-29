import Text from '../Common/Text';

const AppBarTab = (props) => {
  return (
    <Text fontWeight="bold" fontSize="subheading" color="textWhite">
      {props.title}
    </Text>
  );
};

export default AppBarTab;
