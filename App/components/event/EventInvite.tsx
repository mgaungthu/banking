import {useEffect} from 'react';
import {navigate} from '../../utils';
import {Screen} from '../../enums';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const getParams = (url: string) => {
  const [, paramStr] = url.split('?');
  if (paramStr) {
    return paramStr.split(',').reduce((acc, cur) => {
      const [key, value] = cur.split('=');
      acc[key] = value;
      return acc;
    }, {});
  }

  return {};
};

export default () => {
  const handleDynamicLink = link => {
    if (link) {      

      try {
        if (link.url.includes('https://globiance.page.link/referral') || link.url.includes('globiance.com/register')) {                            
          const params = getParams(link.url);          

          navigate(Screen.Signup, {referralCode: params.referralCode});
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const readDynamicLinkOpenApp = async () => {
    try {
      const dataLink = await dynamicLinks().getInitialLink();
      handleDynamicLink(dataLink);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    //dynamic link OpenApp
    readDynamicLinkOpenApp();
  }, []);

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, []);

  return null;
};
