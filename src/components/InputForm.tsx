import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface Props {
  title: string;
  onChangeText: (text: string) => void;
}

const InputForm: React.FC<Props> = ({title, onChangeText}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
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
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#2D2D2D',
    width: '35%',
    fontWeight: '600',
  },
  input: {
    width: '50%',
    borderWidth: 1,
    marginLeft: 20,
    height: 40,
    fontSize: 15,
    borderRadius: 5,
    paddingLeft: 15,
  },
});
