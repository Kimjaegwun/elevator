import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import InputForm from '../components/InputForm';

// 스크린 높이
const {height} = Dimensions.get('window');

const MakeElevator = () => {
  const [floor, setFloor] = useState(0);
  const [elevatorNum, setElevatorNum] = useState(0);

  // 층수 값 변경
  const onChangeFloor = (text: string) => {
    setFloor(Number(text));
  };

  // 엘레베이터 값 변경
  const onChangeElevatorNum = (text: string) => {
    setElevatorNum(Number(text));
  };

  return (
    <View style={styles.container}>
      <InputForm title="층수" onChangeText={onChangeFloor} />
      <View style={{height: 15}} />
      <InputForm title="엘레베이터 수" onChangeText={onChangeElevatorNum} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height / 3,
  },
});

export default MakeElevator;
