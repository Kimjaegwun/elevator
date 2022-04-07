import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import Box from '../components/Box';
import Button from '../components/Button';
import {EVType} from '../types';

type Props = {
  route: {
    params: {
      floor: number;
      elevatorNum: number;
    };
  };
};

const Elevators: React.FC<Props> = ({route}) => {
  // 이전 생성 데이터 저장
  const [origin, setOrigin] = useState({
    floor: route.params.floor,
    elevatorNum: route.params.elevatorNum,
  });

  const [floor, setFloor] = useState(route.params.floor);
  const [elevatorNum, setElevatorNum] = useState(route.params.elevatorNum);

  // 층수 및 엘레베이터 모델
  const [floorModel, setFloorModel] = useState<Array<number>>([]);
  const [evModels, setEVModels] = useState<Array<EVType>>([]);

  // route를 통해 가져온 값을 통해 E/V 모델 생성
  useEffect(() => {
    const routeFloor = route.params.floor;
    const routeElevator = route.params.elevatorNum;

    let modelArr = [] as Array<EVType>;
    let floorArr = [];

    for (let i = 0; i < routeElevator; i++) {
      let arr = [];

      for (let j = 0; j < routeFloor; j++) {
        arr.push(0);
      }
      modelArr.push({
        id: i,
        current_floor: 0,
        target_floor: 0,
        floors: arr,
      });
    }

    for (let i = 0; i < routeFloor; i++) {
      floorArr.push(i);
    }

    setEVModels(modelArr);
    setFloorModel(floorArr);
  }, [route]);

  // 층수 값 변경
  const onChangeFloor = (text: string) => {
    setFloor(Number(text));
  };

  // 엘레베이터 값 변경
  const onChangeElevatorNum = (text: string) => {
    setElevatorNum(Number(text));
  };

  return (
    <ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.evContainer}>
        <View>
          {floorModel &&
            floorModel.map(item => {
              return (
                <View key={item} style={styles.floorContainer}>
                  <Button
                    width={45}
                    height={40}
                    title={String(item + 1)}
                    func={() => {}}
                    bgColor="gray"
                  />
                </View>
              );
            })}
        </View>
        {evModels &&
          evModels.map(model => (
            <FlatList
              key={model.id + ''}
              data={model.floors}
              renderItem={({item, index}) => {
                const color =
                  model.current_floor === floor - index - 1 ? 'black' : 'white';
                return <Box width={100} height={100} color={color} />;
              }}
              style={{marginLeft: 10}}
            />
          ))}
      </ScrollView>
    </ScrollView>
  );
};

export default Elevators;

const styles = StyleSheet.create({
  evContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  floorContainer: {
    paddingVertical: 30,
    marginRight: 20,
  },
});
