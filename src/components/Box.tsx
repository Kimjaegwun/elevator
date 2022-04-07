import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  width: number;
  height: number;
  color: string;
  text?: string;
}

const Box: React.FC<Props> = ({width, height, color, text}) => {
  return (
    <View
      style={[
        styles.wrapper,
        {
          width: width,
          height: height,
          backgroundColor: color,
        },
      ]}>
      <Text style={styles.content}>{text}</Text>
    </View>
  );
};

export default React.memo(Box);

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
