//import CryptoJS from 'crypto-js';
import axios from "axios";
import { Response } from "../redux/types";
//import SchemeCodes from '../constants/SchemeCodes';
import { ERROR_CODE_TYPES } from "../constants/error";
//import currencyCodeSymbol from '../constants/currency-code-symbol';
import type { AppDispatch } from "../redux/store/store";
import { logUserOut, setUser } from "../redux/slice/UserSlice";
import { ErrorResponse } from "../redux/types/auth";
import { Alert } from "react-native";
import currencyCodeSymbol from "../constants/currency-code-symbol";

export const getBaseUrl = () => {
  // if (__DEV__) {
  return "http://localhost:4002/api/api";
  // }
  return "";
};

export const getAuthBaseUrl = () => {
  // if (__DEV__) {
  return "http://localhost:4002/api/auth";
  // }
  return "";
};

export const getcartBaseUrl = () => {
  // if (__DEV__) {
  return "https://api.qjumpa.com/api";
  // }
  return "";
};

// export const changeAndroidNavigationBarColor = async (color: string) => {
//   try {
//     const response = await changeNavigationBarColor('#E6EBF5');
//   } catch (err) {
//     console.log(err);
//   }
// };

const emptyFunc = () => {};

export const Console = __DEV__
  ? console
  : { warn: emptyFunc, log: emptyFunc, error: emptyFunc, info: emptyFunc };

export function getFomattedDate(date: Date) {
  if (!date) {
    return "";
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1.
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

interface EncryptionResult {
  success: boolean;
  encryptedText: string;
  error?: string;
}

// export const encryptWithAES256 = (originalText: string): EncryptionResult => {
//   try {
//     const key = CryptoJS.enc.Utf8.parse('wQ2mm5V4Uad2sygYJVHF9yPEufd8AHPD');
//     const iv = CryptoJS.enc.Utf8.parse('&Fq6lm$La,2E7%H;');

//     let encrypted = CryptoJS.AES.encrypt(
//       CryptoJS.enc.Utf8.parse(originalText),
//       key,
//       {
//         keySize: 128 / 8,
//         iv: iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7,
//       },
//     );

//     return {
//       success: true,
//       encryptedText: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
//     };
//   } catch (error) {
//     Console.log('encryptWithAES256 err', error);
//     return {
//       success: false,
//       encryptedText: '',
//       error: `Encryption error: ${String(error)}`,
//     };
//   }
// };

interface DecryptionResult {
  success: boolean;
  decryptedText: string;
  error?: string;
}

// export const decryptWithAES256 = (originalText: string): DecryptionResult => {
//   try {
//     const key = CryptoJS.enc.Utf8.parse('wQ2mm5V4Uad2sygYJVHF9yPEufd8AHPD');
//     const iv = CryptoJS.enc.Utf8.parse('&Fq6lm$La,2E7%H;');

//     let decrypted = CryptoJS.AES.decrypt(originalText, key, {
//       keySize: 128 / 8,
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });

//     return {
//       success: true,
//       decryptedText: decrypted.toString(CryptoJS.enc.Utf8),
//     };
//   } catch (error) {
//     Console.log('decryptWithAES256 err', error);
//     return {
//       success: false,
//       decryptedText: '',
//       error: `Encryption error: ${String(error)}`,
//     };
//   }
// };

export function replaceWithAsterisks(
  inputString: string,
  startIndex: number,
  length: number
): string {
  if (startIndex < 0 || startIndex >= inputString.length || length <= 0) {
    // Invalid parameters, return the original string
    return inputString;
  }

  const endIndex = startIndex + length;
  const prefix = inputString.substring(0, startIndex);
  const replacedPart = "*".repeat(length);
  const suffix = inputString.substring(endIndex);

  return prefix + replacedPart + suffix;
}

export const generateRandomGUID = (): string => {
  const randomHex = Math.floor(Math.random() * 0xffffffff)
    .toString(16)
    .toUpperCase();
  const paddedHex = randomHex.padStart(32, "0"); // Ensure the string is 32 characters long
  return paddedHex;
};

export const generateRandomHex = (length: number): string => {
  const characters = "0123456789abcdef";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
};

// export const returnCountryCode = (name: string) => {
//   let countryobject = country.find(
//     item => item.name.toLowerCase() == name.toLowerCase(),
//   );

//   return countryobject ? countryobject.code : name;
// };

export function appendDateStringToDate(dateString: string): Date | string {
  return `${dateString}T00:00:00.000Z`;
}

// export const returnDecryptedError = (err: unknown, objRes = false) => {
//   Console.log('returnDecryptedError 1', [String(err)]);
//   let generic_msg = 'Request Failed Please try again';
//   let generic_error_code = ERROR_CODE_TYPES['GENERAL_ERROR'];
//   if (axios.isAxiosError(err)) {
//     if (String(err).indexOf('Network Error') > -1) {
//       return 'Network Error';
//     }
//     if (err?.response?.data) {
//       let error = JSON.parse(
//         decryptWithAES256(err.response.data).decryptedText,
//       );

//       Console.log('returnDecryptedError 2', [error]);

//       if (typeof error == 'object') {
//         let res_err = error as Response;
//         if (!objRes) {
//           return res_err.ResponseMessage || generic_msg;
//         } else {
//           return {
//             responseMessage: res_err.ResponseMessage || generic_msg,
//             responseCode: res_err.ResponseCode || generic_error_code,
//           };
//         }
//       }
//       return objRes
//         ? {
//             responseMessage: generic_msg,
//             responseCode: generic_error_code,
//           }
//         : generic_msg;
//     }
//   }

//   return objRes
//     ? {
//         responseMessage: generic_msg,
//         responseCode: generic_error_code,
//       }
//     : generic_msg;
// };

// export const accountNameType = (schemeCode = '', schemeType = '') => {
//   if (!schemeCode || !schemeType) {
//     return '';
//   }
//   return (
//     SchemeCodes.find(item => item.schemeCode == schemeCode && item.schemeType)
//       ?.name || ''
//   );
// };

// export function getCurrencySymbol(code: string) {
//   const currency = currencyCodeSymbol.find(
//     currency => currency.code === code.toUpperCase(),
//   );
//   return currency ? currency.symbol : '';
// }

export function getCurrencySymbol(code: string) {
  const currency = currencyCodeSymbol.find(
    (currency) => currency.code === code.toUpperCase()
  );
  return currency ? currency.symbol : "";
}

export function addCommasToNumber(number: string | number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function removeCommasFromNumber(numberWithCommas: string) {
  return numberWithCommas.replace(/,/g, "");
}

export function handleErrorEdgeCases(
  dispatch: AppDispatch,
  error: ErrorResponse,
  defaultAction?: () => void
) {
  try {
    if (!dispatch || !error) {
      return;
    }

    switch (error.errorCode) {
      case ERROR_CODE_TYPES["PASSWORD_ACCOUNT_LOCKED"]:
        Alert.alert(
          "You account has been locked, please contact customer care"
        );
        dispatch(logUserOut());
        break;
      case ERROR_CODE_TYPES["PIN_MISMATCH"]:
        Alert.alert(
          `Transaction pin is incorrect, you have 3 attempts before account is locked`
        );
        break;
      case ERROR_CODE_TYPES["PIN_ACCOUNT_LOCKED"]:
        Alert.alert("You transaction pin has been locked!");
        break;
      default:
        defaultAction && defaultAction();
        break;
    }
  } catch (err) {
    Console.log("handleErrorEdgeCases err", err);
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-NG", options).format(date);
  return formattedDate.replace(/\b\d{1,2}\b/g, (match) => {
    const num = parseInt(match);
    const suffixes = ["th", "st", "nd", "rd"];
    const suffix =
      num % 100 > 10 && num % 100 < 14 ? "th" : suffixes[num % 10] || "th";
    return `${num}${suffix}`;
  });
}

export function getTimeInAMPMFormat(dateString: string): string {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}
