import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface Props {
  width: string;
  title: string;
  func: () => void;
}

const Button: React.FC<Props> = ({width, title, func}) => {
  return (
    <TouchableOpacity style={[styles.container, {width: width}]} onPress={func}>
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
    backgroundColor: '#0fbcf9',
  },
  content: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
