import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import {Cell} from '../../../components';
import {isDarkTheme} from '../../../utils/ThemeFunctions';
import {useSelector} from 'react-redux';
import {IEO_images} from '../../../utils/TestingData';
import BreakDown from './BreakDown';
import {RoundUptoSignificant} from '../../../utils/AppFunctions';
import {ThemeFunctions} from '../../../utils';
import {strings} from '../../../strings';
import {rtlStyles} from '../../../globalstyles/styles';
import { ieoRateSelector } from '../../../store/selectors/ieosSelector';

const TotalOutput = ({amount, secondCurrency, firstCurrency}) => {
  const {rate, isLoading, isError} = useSelector(ieoRateSelector);
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );

  const [opened, setOpened] = useState(false);

  const imageUri = IEO_images.find(
    item => item.currencyName === secondCurrency,
  )?.uri;

  const bonus = (rate.bonus / 100) * amount;
  const totalAmount = parseFloat(bonus as string) + parseFloat(amount);

  return (
    <Cell
      style={[{justifyContent: 'space-between'}]}
      onPress={() => setOpened(!opened)}>
      {opened ? (
        <>
          <BreakDown
            secondCurrency={secondCurrency}
            firstCurrency={firstCurrency}
            amount={amount}
            imgUri={imageUri}
          />
        </>
      ) : (
        <>
          {isRtlApproach ? (
            <Text style={ThemeFunctions.getTextColor(appTheme)}>
              {RoundUptoSignificant(totalAmount.toString()) + ' ' + secondCurrency}
            </Text>
          ) : (
            <Text style={ThemeFunctions.getTextColor(appTheme)}>
              {strings('total_output')}
            </Text>
          )}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {isRtlApproach ? (
              <Text style={ThemeFunctions.getTextColor(appTheme)}>
                {strings('total_output')}
              </Text>
            ) : (
              <Text style={ThemeFunctions.getTextColor(appTheme)}>
                {RoundUptoSignificant(totalAmount.toString()) + ' ' + secondCurrency}
              </Text>
            )}
            <Image
              source={{uri: imageUri}}
              style={{width: 20, height: 20, marginLeft: 5}}
            />
            <Icon
              name="expand-more"
              type="material"
              size={22}
              color={isDarkTheme(appTheme) ? '#fff' : '#000'}
            />
          </View>
        </>
      )}
    </Cell>
  );
};

export default TotalOutput;
