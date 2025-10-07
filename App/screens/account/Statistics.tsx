import React, {useEffect, useState} from 'react'
import {SafeAreaView, ScrollView, Text} from 'react-native'
import {commonStyles} from '../../globalstyles/styles'
import {Header} from '../../components'
import {accountStyles as styles} from './styles'
import {strings} from '../../strings'
import Graph from '../../components/ui/Graph'
import {useSelector} from 'react-redux'
import {ThemeFunctions} from '../../utils'
import moment from 'moment'
const Statistics = (props: any) => {
  const appData = useSelector((state: any) => state.appReducer)
  const {appTheme} = useSelector((state: any) => state.globalReducer)

  const [graphData, setGraphData] = useState([])
  const [xAxisValues, setXAxisValues] = useState([])
  const [xAxisLabels, setXAxisLabels] = useState([])
  const [staticYValues, setStaticYValues] = useState([])
  // const [selectedFilter, setSelectedFilter] = useState(1)
 /* const getYAxisValue = (date: any) => {
    const data = [...appData.graphData]
    let yValue = ''
    data.map(res => {
      if (date === moment(res.date, 'YYYY-MM-DD').valueOf()) {
        yValue = res.value
      }
    })
    if (yValue === '') {
      data.map((value, index, array) => {
        let lastMillis = moment(
          array[array.length - 1].date,
          'YYYY-MM-DD',
        ).valueOf()
        if (index === data.length - 1 && date > lastMillis) {
          yValue = array[array.length - 1].value
        } else if (
          date > moment(array[index].date, 'YYYY-MM-DD').valueOf() &&
          date < moment(array[index + 1].date, 'YYYY-MM-DD').valueOf()
        ) {
          yValue = value.value
        }
      })
    }
    return parseFloat(yValue)
  }
  const getArrayMax = (array: any) => {
    return Math.max.apply(null, array)
  }
  const getArrayMin = (array: any) => {
    return Math.min.apply(null, array)
  }
  useEffect(() => {
    if (appData.graphData.length > 0) {
      const data = [...appData.graphData]
      const uniqueValues = [...new Set(data.map(item => Number(item.value)))]
      const uniqueXValues = []
      const graphDataSet = []
      let startMillis = moment(data[0].date, 'YYYY-MM-DD').valueOf()
      let endMillis = Date.now()
      for (let i = startMillis; i < endMillis; i += 86400000) {
        uniqueXValues.push(i)
      }
      uniqueXValues.map((value, index, array) => {
        setXAxisLabels(oldData => [...oldData, moment(value).format('DD-MMM')])
        setXAxisValues(oldData => [...oldData, index * 2])
        graphDataSet.push({x: index * 2, y: getYAxisValue(value)})
      })
      let minY = getArrayMin(uniqueValues)
      let maxY = getArrayMax(uniqueValues)
      let proportion = (maxY - minY) / 10
      for (let i = minY; i < maxY + proportion; i += proportion) {
        setStaticYValues(oldData => [...oldData, i])
      }
      setGraphData(graphDataSet)
    }
  }, [appData.graphData])*/
  // const FilterView: any = (props: any) => {
  //   return (
  //     <TouchableOpacity onPress={() => setSelectedFilter(props.id)}>
  //       <Text
  //         style={
  //           selectedFilter === props.id
  //             ? commonStyles.graphFilterLabelSelected
  //             : commonStyles.graphFilterLabelDefault
  //         }>
  //         {props.value}
  //       </Text>
  //     </TouchableOpacity>
  //   )
  // }
  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={strings('gbex_the_token')} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* <View
          style={[
            commonStyles.rowView,
            commonStyles.graphFilterContainer,
            {width: '100%', justifyContent: 'flex-end'},
          ]}>
          <FilterView id={1} value='1M' />
          <FilterView id={2} value='2M' />
          <FilterView id={3} value='3M' />
          <FilterView id={4} value='4M' />
          <FilterView id={5} value='YTD' />
        </View> */}
        {/* {graphData?.length > 0 && (
          <Graph
            graphData={graphData}
            xAxisValues={xAxisValues}
            yAxisValues={staticYValues}
            xAxisLabels={xAxisLabels}
            yMin={getArrayMin(staticYValues)}
            yMax={getArrayMax(staticYValues)}
          />
        )} */}
        <Text
          style={[
            styles.gbexDesc,
            {color: ThemeFunctions.customText(appTheme)},
          ]}>
          {strings('gbex_desc')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}
export default Statistics
