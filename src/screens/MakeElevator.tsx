import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Alert, Dimensions, StyleSheet, View} from 'react-native';
import Button from '../components/Button';
import InputForm from '../components/InputForm';
import {RootStackParamList} from '../types';

// 스크린 높이
const {height} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Elevators'>;

const HView = (h: number) => <View style={{height: h}} />;

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
    if (floor !== 0 && elevatorNum !== 0) {
      return navigation.navigate('Elevators', {floor, elevatorNum});
    }

    return Alert.alert('층 및 엘리베이터 수를 입력해주세요.');
  };

  return (
    <View style={styles.container}>
      <InputForm
        title="층수"
        value={String(floor)}
        onChangeText={onChangeFloor}
        width="70%"
      />
      {HView(15)}
      <InputForm
        title="엘리베이터"
        onChangeText={onChangeElevatorNum}
        width="70%"
        value={String(elevatorNum)}
      />
      {HView(30)}
      <Button
        title="생성하기"
        width="70%"
        height={45}
        func={navElevators}
        bgColor="#0fbcf9"
        disabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height / 3,
    backgroundColor: '#ffffff',
  },
});

export default MakeElevator;
