import {showToast} from '../utils/GenericUtils';

export const HandlePaymentGatewayError = e => {
  if (e.isAxiosError) {
    const {
      error: {field, message},
    } = e.response.data;

    if (field) showToast('Error', `${field}:${message}`, 'error');
    else showToast('Error', message, 'error');
  } else {
    showToast('Error', 'Something went wrong', 'error');
  }
};
