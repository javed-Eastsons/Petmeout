import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native';
import Slider from '@react-native-community/slider';
import { DISTANCE } from '../../Redux/Actions/types';
import { useDispatch } from 'react-redux';

const AnimatedRangeSlider = ({ min = 0, max = 100, initialMin = 20, initialMax = 80 }) => {
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const minAnim = useRef(new Animated.Value(initialMin)).current;
  const maxAnim = useRef(new Animated.Value(initialMax)).current;
  const dispatch = useDispatch()
  const handleValueChange = (min, max) => {
    Animated.parallel([
      Animated.timing(minAnim, {
        toValue: min,
        duration: 300,
        useNativeDriver: false
      }),
      Animated.timing(maxAnim, {
        toValue: max,
        duration: 300,
        useNativeDriver: false
      })
    ]).start();

    setMinValue(min);
    setMaxValue(max);

  };

  useEffect(() => {
    dispatch({
      type: DISTANCE,
      payload: maxValue,
    });
  }, [maxValue])

  return (
    <View style={styles.container}>
      <View style={styles.trackContainer}>
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          step={1}
          value={maxValue}
          onValueChange={value => handleValueChange(minValue, value)}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1EB1FC"
        />

      </View>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Distance: {maxValue} Km</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red',
    height:100
  },
  trackContainer: {
    width: '100%',
    height: 40, // Increase height to make the track appear thicker
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: '80%',
    height: 40,
    marginBottom: 20,
  },
  track: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#1EB1FC',
    top: 20,
    width: '80%',
  },
  labelContainer: {
    // marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
  },
  label: {
    fontSize: 16,
    color: '#000',

    fontFamily: 'Poppins-SemiBold'
  },
});

export default AnimatedRangeSlider;
