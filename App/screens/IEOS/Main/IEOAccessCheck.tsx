import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {
  Header,
  LoadingSpinner,
  ThemeButton,
  ThemeText,
} from '../../../components';
import Colors from '../../../theme/Colors';
import {ThemeFunctions} from '../../../utils';
import {useSelector} from 'react-redux';
import {strings} from '../../../strings';
import {styles} from './IEO_style';
import {makeRequest} from '../../../services/ApiService';
import {APIConstants} from '../../../constants';
import {showToast} from '../../../utils/GenericUtils';
import Link from '../../../components/hoc/Link';

const CODE = 'SE';

const IEOAccessCheck = (props: any) => {
  const [loading, setLoading] = useState(false);
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  const {onAllow} = props;

  const allowRegion = async () => {
    try {
      setLoading(true);
      const response = await makeRequest(
        'POST',
        APIConstants.APPROVE_REGION,
        {},
        {
          region: CODE,
        },
      );

      if (response.status === 200) {
        onAllow && onAllow();
      } else {
        if (response.message) {
          showToast('error', response.message, 'error');
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={[ThemeFunctions.setBackground(appTheme),{height: '100%'}]}>
      <View
        style={[
          {height: '100%'},
          ThemeFunctions.setBackground(appTheme),
          styles.allowAccessContainer,
          {paddingBottom:50}
        ]}>
        <ThemeText>
          <Link url="https://se.globiance.com">
            <ThemeText style={{color: ThemeFunctions.getColor(appColor)}}>
              se.globiance.com
            </ThemeText>
          </Link>
          &nbsp; and Launchpad
          <Text style={{color: ThemeFunctions.getColor(appColor)}}>S</Text> is a
          service operated by GlobiancePay SX K.B., a Trust company officially
          registered in Sweden.
        </ThemeText>

        <ThemeText>
          We are officially registered as Professional Trustee in accordance
          with the Money Laundering and Terrorist Financing Prevention Act
          2017:630 (AML/FT Compliance) with the Stockholm County Administrative
          Board as Supervisory Authority for AML/CFT purposes.
        </ThemeText>
        <ThemeText></ThemeText>

        <ThemeText>
          Registered Office: Postfack 2334, 11674 Stockholm, Sweden
        </ThemeText>
        <ThemeText></ThemeText>
        <ThemeText>
          Yes, I agree to share my KYC details and open an account with
          GlobiancePay SX K.B. to manage my assets.
        </ThemeText>
        <ThemeText></ThemeText>

        <ThemeText>
          I have read and understood the{' '}
          <Link url="https://cdn.globiance.com/docs/SE-T&C.pdf">
            <ThemeText style={{color: ThemeFunctions.getColor(appColor)}}>
              Terms & Conditions
            </ThemeText>
          </Link>{' '}
          of the platform and accept them.
        </ThemeText>

        <ThemeButton
          loading={loading}
          text={strings('allow_access')}
          onClickHandler={allowRegion}
        />
      </View>
    </ScrollView>
  );
};

export default IEOAccessCheck;
