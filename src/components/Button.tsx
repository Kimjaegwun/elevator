import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface Props {
  width: string | number;
  height: string | number;
  title: string;
  func: () => void;
  bgColor: string;
}

const Button: React.FC<Props> = ({width, height, title, func, bgColor}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {width: width, backgroundColor: bgColor, height: height},
      ]}
      onPress={func}>
      <Text style={styles.content}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  content: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
