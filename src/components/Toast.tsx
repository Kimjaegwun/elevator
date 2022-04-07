import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, Animated, Dimensions, View} from 'react-native';

type Props = {
  modal: boolean;
};

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const ToastModal = ({modal}: Props) => {
  const [fadeIn] = useState(new Animated.Value(0));
  const [open, setOpen] = useState(true);

  const fadeInFunc = () => {
    return Animated.timing(fadeIn, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start(() => fadeOutFunc());
  };

  const fadeOutFunc = () => {
    return Animated.timing(fadeIn, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (open === false) {
      fadeInFunc();
    }
    setOpen(false);
  }, [modal]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.container, {opacity: fadeIn}]}>
      <View style={styles.wrapper}>
        <Text allowFontScaling={false} style={styles.text}>
          현재 운행가능한 E/V가 없습니다.{'\n'}잠시만 기다려주시기 바랍니다.
        </Text>
      </View>
    </Animated.View>
  );
};

export default ToastModal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: screenWidth,
    zIndex: 999,
    top: screenHeight * 0.75,
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: '#2D2D2D',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  text: {
    fontSize: 13,
    textAlign: 'center',
    color: 'white',
    flex: 1,
  },
});
