export const successStatusCodesRegex = /^[2][0-9][0-9]$/;
export const clientErrorExceptUnauthorizedStatusCodesRegex =
  /^[4][0-9][2-9{0}]$/;
export const internalServerErrorRegex = /^[5][0-9][2-9{0}]$/;

export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
export const PHONE_REGEX = /^[0-9\b]+$/;
export const NUMBER_REGEX = /^[0-9\b]+$/;
export const ALPHABET_WITH_SPACE_REGEX = /^[a-zA-Z]+ [a-zA-Z]+$/;
export const NAME_REGEX = /^[a-zA-Z]+$/;
// export const PASSWORD_REGEX = /^(?=.*(^[a-zA-Z]){1})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

export const DECIMAL_REGEX = /^[0-9]\d{0,9}(\.\d{1,12})?%?$/;
export const IS_REGEX = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export const AddressRegex = (isAddress: string, network?: string) => {
  if (!network) {
    let pattern;
    if (isAddress == 'BTC') {
      pattern = /^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/;
    } else if (isAddress == 'ETH' || isAddress == 'XDCE') {
      pattern = /^(0x|0X)?[0-9a-fA-F]{40}$/;
    } else if (isAddress == 'XDC') {
      pattern = /^(xdc|XDC)?[0-9a-fA-F]{40}$/;
    } else if (isAddress == 'XRP') {
      pattern =
        /^r[rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz]{27,35}$/;
    } else {
      pattern = null;
    }
    return pattern;
  } else {
    let pattern;

    if (network === 'ERC20') {
      pattern = /^(0x|0X)?[0-9a-fA-F]{40}$/;
    } else if (network === 'XRC20') {
      pattern = /^(xdc|XDC)?[0-9a-fA-F]{40}$/;
    } else {
      pattern = null;
    }

    return pattern;
  }
};
