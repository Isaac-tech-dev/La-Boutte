// Contains all api calls relating to user accounts
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Response} from '../types';
import {FetchCampaignResponse, UpdateUserEmailAttribute,UpdateUserEmailResponse,UpgradeUserAccountResponse,UpgradeUserAccountAttribute, UpdateUserPhoneAttribute, UpdateUserPhoneResponse} from '../types/user';
import {
  Console,
  decryptWithAES256,
  encryptWithAES256,
  getBaseUrl,
  returnDecryptedError,
} from '../../utils';
import {ErrorResponse} from '../types/auth';
import {ERROR_CODE_TYPES} from '../../constants/error';
import {RootState} from '../store/store';

export const fetchAllCampaigns = createAsyncThunk<
  FetchCampaignResponse[],
  undefined,
  {state: RootState; rejectValue: ErrorResponse}
>('opti2.0/fetchAllCampaigns', async (param, thunkApi) => {
  try {
    const store = thunkApi.getState();

    const result = await axios.get(`${getBaseUrl()}/campaigns`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${store.user.accessToken}`,
      },
    });
    let decrypted_string = decryptWithAES256(result.data).decryptedText;
    if (!decrypted_string) {
      return thunkApi.rejectWithValue({
        errorCode: ERROR_CODE_TYPES['GENERAL_ERROR'],
        errorMsg: 'Something went wrong please try again',
      });
    }

    let data = JSON.parse(decrypted_string) as Response;

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue({
        errorCode: data.ResponseCode || ERROR_CODE_TYPES['GENERAL_ERROR'],
        errorMsg:
          data.ResponseMessage || 'Unable to fetch Campaigns, please try again',
      });
    }

    let res_data = data.Data as FetchCampaignResponse[];
    Console.info('FetchCampaign data', data);
    return thunkApi.fulfillWithValue(res_data);
  } catch (err) {
    Console.log('FetchCampaign param-----', param);
    let error = returnDecryptedError(err, true);
    Console.log('FetchCampaign err-----', error);

    let errobj = {
      errorCode: '',
      errorMsg: '',
    };
    if (typeof error == 'object') {
      errobj.errorCode = error.responseCode;
      errobj.errorMsg = error.responseMessage;
    } else {
      errobj.errorCode = ERROR_CODE_TYPES['GENERAL_ERROR'];
      errobj.errorMsg = error;
    }
    return thunkApi.rejectWithValue(errobj);
  }
});


export const updatedUserEmail = createAsyncThunk<
UpdateUserEmailResponse,
UpdateUserEmailAttribute,
  {state: RootState; rejectValue: ErrorResponse}
>('opti2.0/updateUserEmail', async (param, thunkApi) => {
  try {
    let d = encryptWithAES256(JSON.stringify(param)).encryptedText;
    Console.log('----User Encrypted Details encrypted---', d);
    const store = thunkApi.getState();
    const result = await axios.post(
      `${getBaseUrl()}/Kyc/Email`,
      {
        data: d
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${store.user.accessToken}`,
        },
      },
    );

    let decrypted_string = decryptWithAES256(result.data).decryptedText;
    if (!decrypted_string) {
      return thunkApi.rejectWithValue({
        errorCode: ERROR_CODE_TYPES['GENERAL_ERROR'],
        errorMsg: 'Something went wrong please try again',
      });
    }
    let data = JSON.parse(decrypted_string) as Response;

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue({
        errorCode: data.ResponseCode || ERROR_CODE_TYPES['GENERAL_ERROR'],
        errorMsg: data.ResponseMessage || 'Request failed please try again',
      });
    }

    let res_data = data.Data as UpdateUserEmailResponse;
    return thunkApi.fulfillWithValue(res_data);
  } catch (err) {
    Console.log('requestCard param-----', param);
    let error = returnDecryptedError(err, true);
    Console.log('requestCard err-----', error);

    let errobj = {
      errorCode: '',
      errorMsg: '',
    };
    if (typeof error == 'object') {
      errobj.errorCode = error.responseCode;
      errobj.errorMsg = error.responseMessage;
    } else {
      errobj.errorCode = ERROR_CODE_TYPES['GENERAL_ERROR'];
      errobj.errorMsg = error;
    }
    return thunkApi.rejectWithValue(errobj);
  }
});


export const updatedUserPhoneNumber = createAsyncThunk<
UpdateUserPhoneResponse,
UpdateUserPhoneAttribute,
  {state: RootState; rejectValue: ErrorResponse}
>('opti2.0/updatedUserPhoneNumber', async (param, thunkApi) => {
  try {
    let d = encryptWithAES256(JSON.stringify(param)).encryptedText;
    Console.log('----User Encrypted Details encrypted---', d);
    const store = thunkApi.getState();
    const result = await axios.post(
      `${getBaseUrl()}/Kyc/PhoneNo`,
      {
        data: d
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${store.user.accessToken}`,
        },
      },
    );

    let decrypted_string = decryptWithAES256(result.data).decryptedText;
    if (!decrypted_string) {
      return thunkApi.rejectWithValue({
        errorCode: ERROR_CODE_TYPES['GENERAL_ERROR'],
        errorMsg: 'Something went wrong please try again',
      });
    }
    let data = JSON.parse(decrypted_string) as Response;

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue({
        errorCode: data.ResponseCode || ERROR_CODE_TYPES['GENERAL_ERROR'],
        errorMsg: data.ResponseMessage || 'Request failed please try again',
      });
    }

    let res_data = data.Data as UpdateUserPhoneResponse;
    return thunkApi.fulfillWithValue(res_data);
  } catch (err) {
    Console.log('requestCard param-----', param);
    let error = returnDecryptedError(err, true);
    Console.log('requestCard err-----', error);

    let errobj = {
      errorCode: '',
      errorMsg: '',
    };
    if (typeof error == 'object') {
      errobj.errorCode = error.responseCode;
      errobj.errorMsg = error.responseMessage;
    } else {
      errobj.errorCode = ERROR_CODE_TYPES['GENERAL_ERROR'];
      errobj.errorMsg = error;
    }
    return thunkApi.rejectWithValue(errobj);
  }
});

export const upgradeUserAccount = createAsyncThunk<
UpgradeUserAccountResponse,
UpgradeUserAccountAttribute,
  {state: RootState; rejectValue: ErrorResponse}
>('opti2.0/upgradeUserAccount', async (param, thunkApi) => {
  try {
    let d = encryptWithAES256(JSON.stringify(param)).encryptedText;
    Console.log('----User Encrypted Details encrypted---', d);
    const store = thunkApi.getState();
    const result = await axios.post(
      `${getBaseUrl()}/Kyc/Account`,
      {
        data: d
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${store.user.accessToken}`,
        },
      },
    );

    let decrypted_string = decryptWithAES256(result.data).decryptedText;
    if (!decrypted_string) {
      return thunkApi.rejectWithValue({
        errorCode: ERROR_CODE_TYPES['GENERAL_ERROR'],
        errorMsg: 'Something went wrong please try again',
      });
    }
    let data = JSON.parse(decrypted_string) as Response;

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue({
        errorCode: data.ResponseCode || ERROR_CODE_TYPES['GENERAL_ERROR'],
        errorMsg: data.ResponseMessage || 'Request failed please try again',
      });
    }

    let res_data = data.Data as UpgradeUserAccountResponse;
    return thunkApi.fulfillWithValue(res_data);
  } catch (err) {
    Console.log('requestCard param-----', param);
    let error = returnDecryptedError(err, true);
    Console.log('requestCard err-----', error);

    let errobj = {
      errorCode: '',
      errorMsg: '',
    };
    if (typeof error == 'object') {
      errobj.errorCode = error.responseCode;
      errobj.errorMsg = error.responseMessage;
    } else {
      errobj.errorCode = ERROR_CODE_TYPES['GENERAL_ERROR'];
      errobj.errorMsg = error;
    }
    return thunkApi.rejectWithValue(errobj);
  }
});