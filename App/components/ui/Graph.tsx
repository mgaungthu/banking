import React from 'react';
import {View} from 'react-native';
import {
  Chart,
  Line,
  HorizontalAxis,
  VerticalAxis,
  Tooltip,
  ChartDataPoint,
} from 'react-native-responsive-linechart';
import {commonStyles} from '../../globalstyles/styles';
import Colors from '../../theme/Colors';
import fonts from '../../theme/fonts';
import {ThemeFunctions} from '../../utils';
import {useSelector} from 'react-redux';
const Graph = (props: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const {graphData, xAxisValues, yAxisValues, xAxisLabels, yMin, yMax} = props;
  const formatting = (value: number) => {
    return value.toFixed(10);
  };
  const getToolTipValue = (v: number) => {
    let value = v.toFixed(12).toString();
    value = value.replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1');
    return value;
  };
  return (
    <View
      style={[
        ThemeFunctions.getgrapgBgColor(appTheme),
        commonStyles.graphStyles,
      ]}>
      <Chart
        style={commonStyles.chartStyles}
        data={graphData}
        padding={commonStyles.graphPadding}
        yDomain={{min: yMin, max: yMax}}
        viewport={{size: {width: 10}, initialOrigin: {x: 0, y: 0}}}>
        <VerticalAxis
          tickValues={yAxisValues}
          theme={{
            axis: {
              stroke: {
                color: ThemeFunctions.setGraphBackground(appTheme),
                width: 2,
              },
            },
            ticks: {
              stroke: {
                color: ThemeFunctions.setGraphBackground(appTheme),
                width: 2,
              },
            },
            grid: {
              stroke: {color: ThemeFunctions.setGraphBackground(appTheme)},
            },
            labels: {
              formatter: (v: number) => formatting(v),
              label: {
                ...commonStyles.verticalGraphLabel,
                color: ThemeFunctions.customText(appTheme),
                dx: -4,
                dy: -2,
              },
            },
          }}
        />
        <HorizontalAxis
          tickValues={xAxisValues}
          theme={{
            axis: {
              stroke: {
                color: ThemeFunctions.setGraphBackground(appTheme),
                width: 2,
              },
            },
            ticks: {
              stroke: {
                color: ThemeFunctions.setGraphBackground(appTheme),
                width: 2,
              },
            },
            grid: {
              stroke: {color: ThemeFunctions.setGraphBackground(appTheme)},
            },
            labels: {
              label: {
                ...commonStyles.horizontalGraphLabel,
                color: ThemeFunctions.customText(appTheme),
                dx: 0,
                dy: -20,
              },
              formatter: v => String(xAxisLabels[v === 0 ? v : v / 2]),
            },
          }}
        />
        <Line
          hideTooltipOnDragEnd={true}
          tooltipComponent={
            <Tooltip
              theme={{
                label: {color: Colors.white, fontFamily: fonts.PoppinsMedium},
                shape: {
                  color: ThemeFunctions.graphToolTipBgColor(appTheme),
                  width: 80,
                },
                formatter: (v: ChartDataPoint) => getToolTipValue(v.y),
              }}
            />
          }
          theme={{
            stroke: {
              color: ThemeFunctions.graphStrokeColor(appTheme),
              width: 3,
            },
            scatter: {
              default: {
                width: 8,
                height: 8,
                rx: 4,
                color: ThemeFunctions.graphStrokeColor(appTheme),
                border: {color: Colors.white, width: 1},
              },
              selected: {color: Colors.white},
            },
          }}
          smoothing="bezier"
          tension={0.4}
        />
        {/* <Area
                theme={{ gradient: { from: { color: '#F39C12', opacity: 0.4 }, to: { color: '#F39C12', opacity: 0.4 } } }}
                smoothing="cubic-spline" /> */}
      </Chart>
    </View>
  );
};
export default Graph;
