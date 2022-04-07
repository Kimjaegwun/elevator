import React from 'react';
import {View} from 'react-native';

interface Props {
  width: number;
  height: number;
  color: string;
}

const Box: React.FC<Props> = ({width, height, color}) => {
  return (
    <View
      style={{
        width: width,
        height: height,
        borderWidth: 1,
        backgroundColor: color,
      }}
    />
  );
};

export default Box;
