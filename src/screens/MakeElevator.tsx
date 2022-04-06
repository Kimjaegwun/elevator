import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Button from '../components/Button';
import InputForm from '../components/InputForm';
import {RootStackParamList} from '../types';

// 스크린 높이
const {height} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Elevators'>;

const MakeElevator: React.FC<Props> = ({navigation}) => {
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

  const navElevators = () => {
    navigation.navigate('Elevators', {floor, elevatorNum});
  };

  return (
    <View style={styles.container}>
      <InputForm title="층수" onChangeText={onChangeFloor} width="70%" />
      <View style={{height: 15}} />
      <InputForm
        title="엘리베이터"
        onChangeText={onChangeElevatorNum}
        width="70%"
      />
      <View style={{height: 30}} />

      <Button title="생성하기" width="70%" func={navElevators} />
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
