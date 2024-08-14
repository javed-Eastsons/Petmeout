import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native'

const SpinView=(props)=>{

const Spin = useRef(new Animated.Value(0)).current;
  const SpinValue = Spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1800deg"],
  });
  useEffect(() => {
    Animated.timing(Spin, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [Spin]);

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        transform:[{rotate:SpinValue}],         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default SpinView