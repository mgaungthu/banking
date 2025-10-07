import React, {Component} from 'react';

import {StyleSheet, Animated} from 'react-native';
import Colors from '../../theme/Colors';
import {ThemeFunctions} from '../../utils';
import {replaceCost} from '../../utils/AppFunctions';

export const flickerStyles = StyleSheet.create({
  flickerRed: {},
});

interface FlickerNumberProps {
  value: number|string;
  appTheme: string;
  numberOfLines?: number;
  style?: any;
}

class FlickerNumber extends Component<FlickerNumberProps> {
  constructor(props: FlickerNumberProps) {
    super(props);

    this.state = {
      animation: new Animated.Value(0),
      color: ThemeFunctions.getCurrentTextColor(props.appTheme),
    };
  }

  handleAnimation() {
    this.setState({animation: new Animated.Value(0)}, () => {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 700,
        useNativeDriver:false
      }).start();
    });
  }

  componentDidUpdate(prevProps) {

    const prev= replaceCost(prevProps.value)
    const cur =  replaceCost(this.props.value)

    if (prev > cur) {
      // red flicker
      this.highlightColor = Colors.currencyRed;
      this.handleAnimation();
    } else if (prev < cur) {
      // green flicker
      this.highlightColor = Colors.currencyGreen;
      this.handleAnimation();
    }
  }

  render() {
    const themeTextColor = ThemeFunctions.getCurrentTextColor(
      this.props.appTheme,
    );

    const fromColor = this.highlightColor || themeTextColor;
    const toColor = themeTextColor;
    const numberOfLines = this.props.numberOfLines || 1;

    const propsStyle = this.props?.style || {}

    return (
      <Animated.Text
        adjustsFontSizeToFit={true}
        numberOfLines={numberOfLines}
        style={[{
          color: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [fromColor, toColor], // 0 : 150, 0.5 : 75, 1 : 0
          }),
        }, propsStyle]}>
        {this.props.value}
      </Animated.Text>
    );
  }
}

export default FlickerNumber;
