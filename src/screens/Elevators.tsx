import React, {useState} from 'react';
import {Text, View} from 'react-native';

type Props = {
  route: {
    params: {
      floor: number;
      elevatorNum: number;
    };
  };
};

const Elevators: React.FC<Props> = ({route}) => {
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

  console.log(route.params);

  return (
    <View>
      <Text>Elevators</Text>
    </View>
  );
};

export default Elevators;
