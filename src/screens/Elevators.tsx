import React, {Fragment, useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {EVType} from '../types';
import Box from '../components/Box';
import Button from '../components/Button';
import InputForm from '../components/InputForm';
import ToastModal from '../components/Toast';

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

  // 현재 층 및 E/V 개수
  const [floor, setFloor] = useState(route.params.floor);
  const [elevatorNum, setElevatorNum] = useState(route.params.elevatorNum);

  // 층수 및 E/V 모델
  const [floorModel, setFloorModel] = useState<Array<number>>([]);
  const [evModels, setEVModels] = useState<Array<EVType>>([]);

  // route를 통해 가져온 값을 통해 E/V 모델 생성
  useEffect(() => {
    let modelArr = [] as Array<EVType>;
    let floorArr = [];

    // E/V model 생성
    for (let i = 0; i < elevatorNum; i++) {
      let arr = [];
      for (let j = 0; j < floor; j++) {
        arr.push(0);
      }

      modelArr.push({
        id: i,
        current_floor: 1,
        target_floor: 1,
        floors: arr,
        status: 'waiting',
      });
    }

    // floor 모델 생성
    for (let i = floor; i > 0; i--) {
      floorArr.push(i);
    }

    setEVModels(modelArr);
    setFloorModel(floorArr);
  }, [elevatorNum, floor]);

  // 클릭한 층수들 확인
  const [selectedFloor, setSelectedFloor] = useState<any>({});

  // 가능한 E/V 없을시 toast 활성화
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };

  // 층수 클릭시 E/V 움직임 변경 함수
  const clickFloor = async (clicked: number) => {
    let copyEVModels = evModels.slice();

    // E/V가 동일한 층에 있는지 확인
    const checkEV = copyEVModels.findIndex(
      item => item.status === 'waiting' && item.current_floor === clicked,
    );

    const enableEV = copyEVModels.filter(item => item.status === 'waiting');

    // 사용가능한 E/V가 없을시 toast 활성화
    if (enableEV.length === 0) {
      handleModal();
    }

    if (checkEV === -1 && enableEV.length !== 0) {
      let selectedEV = {ev: [] as number[], distance: 0};

      // E/V를 순회하면서 가까운 E/V를 찾는다
      for (let i = 0; i < copyEVModels.length; i++) {
        if (copyEVModels[i].status === 'waiting') {
          const eachDistance = Math.abs(
            copyEVModels[i].current_floor - clicked,
          );

          if (selectedEV.ev.length === 0) {
            selectedEV.ev.push(copyEVModels[i].id);
          } else {
            if (selectedEV.distance > eachDistance) {
              selectedEV.ev = [copyEVModels[i].id];
            } else {
              selectedEV.ev.push(copyEVModels[i].id);
            }
          }

          selectedEV.distance = eachDistance;
          if (eachDistance === 1) {
            break;
          }
        }
      }

      const getEV = copyEVModels[selectedEV.ev[0]];
      const selectEVDistance = clicked - getEV.current_floor;

      getEV.status = 'moving';
      getEV.target_floor = clicked;
      setEVModels([...copyEVModels]);

      // wait 함수를 사용하여 대기시간 생성
      const wait = (timeToDelay: number) =>
        new Promise(resolve => setTimeout(resolve, timeToDelay));

      for (let i = 0; i < Math.abs(selectEVDistance); i++) {
        if (selectEVDistance > 0) {
          await wait(1000);
          getEV.current_floor += 1;
          setEVModels([...copyEVModels]);
        } else {
          await wait(1000);
          getEV.current_floor -= 1;
          setEVModels([...copyEVModels]);
        }
      }

      getEV.status = 'opening';
      setEVModels([...copyEVModels]);
      await wait(2000);
      getEV.status = 'waiting';
      setEVModels([...copyEVModels]);
    }
  };

  // 층 버튼 클릭시 활성화/비활성화 구분
  useEffect(() => {
    setSelectedFloor(() => {
      const select = evModels.filter(item => item.status !== 'waiting');
      const obj = {} as any;

      for (let i = 0; i < select.length; i++) {
        obj[select[i].target_floor] = select[i].id;
      }
      return {...obj};
    });
  }, [evModels]);

  // 층수 값 변경
  const onChangeFloor = (text: string) => {
    setOrigin(prev => {
      return {...prev, floor: Number(text)};
    });
  };

  // E/V 값 변경
  const onChangeElevatorNum = (text: string) => {
    setOrigin(prev => {
      return {...prev, elevatorNum: Number(text)};
    });
  };

  // 생성시 새로운 E/V 생성
  const createNewModels = () => {
    setFloor(origin.floor);
    setElevatorNum(origin.elevatorNum);
  };

  return (
    <Fragment>
      <ScrollView style={styles.container}>
        {/* 층 및 E/V 생성 컨테이너 */}
        <View style={styles.inputContainer}>
          <View style={{flex: 2}}>
            <InputForm
              title="층수"
              value={String(origin.floor)}
              onChangeText={onChangeFloor}
              width="100%"
            />
            <View style={{height: 10}} />
            <InputForm
              title="엘레베이터"
              onChangeText={onChangeElevatorNum}
              width="100%"
              value={String(origin.elevatorNum)}
            />
          </View>
          <View style={{flex: 3, marginLeft: 20}}>
            <Button
              title="생성하기"
              width="50%"
              height={40}
              func={createNewModels}
              bgColor={
                evModels.filter(item => item.status === 'waiting').length ===
                evModels.length
                  ? '#0fbcf9'
                  : 'gray'
              }
              disabled={
                evModels.filter(item => item.status === 'waiting').length ===
                evModels.length
                  ? false
                  : true
              }
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.evContainer}>
          {/* 층수 모델 */}
          <View>
            {floorModel &&
              floorModel.map(item => {
                const findFloor = selectedFloor[item];

                const color = findFloor !== undefined ? 'gray' : '#38ada9';

                return (
                  <View key={item} style={styles.floorContainer}>
                    <Button
                      width={45}
                      height={40}
                      title={String(item) + '층'}
                      func={() => clickFloor(item)}
                      bgColor={color}
                      disabled={findFloor !== undefined}
                    />
                  </View>
                );
              })}
          </View>

          {/* E/V 모델 */}
          {evModels &&
            evModels.map(model => (
              <FlatList
                key={model.id + ''}
                data={model.floors}
                renderItem={({index}) => {
                  // 층 누를시 선택된 E/V 색깔 변화
                  const color = () => {
                    if (
                      model.status === 'moving' &&
                      model.current_floor === floor - index
                    ) {
                      return '#70a1ff';
                    }

                    if (
                      model.status === 'opening' &&
                      model.current_floor === floor - index
                    ) {
                      return '#7bed9f';
                    }

                    if (model.current_floor === floor - index) {
                      return 'black';
                    } else {
                      return 'white';
                    }
                  };

                  return (
                    <Box
                      width={100}
                      height={100}
                      color={color() || 'white'}
                      text={floor - index + ''}
                    />
                  );
                }}
                contentContainerStyle={{borderWidth: 1}}
                ListFooterComponent={() => (
                  <Text style={styles.evTitle}>E/V {model.id + 1}호기</Text>
                )}
                ListFooterComponentStyle={{borderTopWidth: 1}}
                style={{marginLeft: 10}}
              />
            ))}
        </ScrollView>
      </ScrollView>

      <ToastModal modal={modal} />
    </Fragment>
  );
};

export default Elevators;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
  evContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  floorContainer: {
    paddingVertical: 30,
    marginRight: 20,
  },
  evTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  inputContainer: {
    paddingLeft: 20,
    marginBottom: 30,
    flexDirection: 'row',
  },
});
