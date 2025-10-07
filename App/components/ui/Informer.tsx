import * as React from 'react';
import {Text} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {snackStyles as styles} from './styles';
import {useSelector} from 'react-redux';
import {strings} from '../../strings';

const Informer = () => {
  const {internetAvailable} = useSelector((state: any) => state.globalReducer);
  const [visible, setVisible] = React.useState(!internetAvailable);

  const onDismissSnackBar = () => setVisible(false);
  React.useEffect(() => {
    setVisible(!internetAvailable);
  }, [internetAvailable]);

  return (
    <Snackbar
      visible={visible}
      duration={10000}
      wrapperStyle={styles.wrapper}
      style={styles.container}
      onDismiss={onDismissSnackBar}
      action={{
        label: 'Close',
        onPress: onDismissSnackBar,
      }}>
      <Text style={styles.msg}>{strings('network_connectivity_msg')}</Text>
    </Snackbar>
  );
};

export default Informer;
