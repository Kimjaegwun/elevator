import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface Props {
  title: string;
  onChangeText: (text: string) => void;
  width: string;
  value: string;
}

const InputForm: React.FC<Props> = ({title, onChangeText, width, value}) => {
  return (
    <View style={[styles.wrapper, {width: width}]}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        value={value === '0' ? '' : value}
        style={styles.input}
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#2D2D2D',
    width: 75,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    marginLeft: 20,
    height: 40,
    fontSize: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
  },
});
