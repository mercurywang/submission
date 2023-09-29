import { View, StyleSheet } from 'react-native';
import Text from '../Common/Text';

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: 'center'
  },
  alignStart: {
    alignItems: 'flex-start'
  },
  paddingTop: {
    paddingTop: 8
  }
});

const Expression = ({ main, sub, align }) => {
  const expressionStyles = [
    align === 'alignCenter' && styles.alignCenter,
    align === 'alignStart' && styles.alignStart
  ];

  return (
    <View style={expressionStyles}>
      <Text fontWeight="bold" fontSize="subheading">
        {main}
      </Text>
      <Text color="textGray" style={styles.paddingTop}>
        {sub}
      </Text>
    </View>
  );
};

export default Expression;
