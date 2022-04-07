export type RootStackParamList = {
  Elevators: {floor: number; elevatorNum: number};
  MakeElevator: undefined;
};

export type EVType = {
  id: number;
  current_floor: number;
  target_floor: number;
  floors: number[];
  status: 'waiting' | 'moving' | 'opening';
};
