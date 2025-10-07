import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';

interface LoadingBar {
  color?: string;
  delay?: number;
  duration?: number;
  height?: number;
}

const LoadingBar = ({
  delay = 0,
  duration = 500,
  height = 50,
  color = 'red',
}: LoadingBar) => {
  const rootVal = useRef(new Animated.Value(10)).current;

  const animation = Animated.loop(
    Animated.sequence([
      Animated.timing(rootVal, {
        toValue: height,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.timing(rootVal, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
      }),
    ]),
  );

  useEffect(() => {
    setTimeout(() => animation.start(), delay);

    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        {
          backgroundColor: color,
          height: 1,
          width: 10,
          transform: [{scaleY: rootVal}],
        },
      ]}
    />
  );
};

interface LoadingBars {
  color: string;
}

const LoadingBars = ({color}: LoadingBars) => {
  const bars = new Array(4)
    .fill(1)
    .map((x, i) => <LoadingBar color={color} delay={i * 125} />);

  return (
    <View
      style={[
        {flexDirection: 'row', width: 60, justifyContent: 'space-evenly'},
      ]}>
      {bars}
    </View>
  );
};

export default React.memo(LoadingBars);
