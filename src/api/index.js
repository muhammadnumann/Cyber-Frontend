import axios from 'axios';
import { ErrorDialog, SuccessDialog } from '../components/Dialog';

export const Api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? // ? 'https://backend.soc.shieldriser.com/'
        'http://localhost:8080/'
      : '/pub/backend/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log('interceptor', error);
//     if (error?.response?.status === 401) {
//       window.location.href = `/auth/login`;
//     }
//     // else {
//     //   ErrorDialog(`Response Error!.. ${error?.response?.message}`);
//     // }
//     return error;
//   }
// );

// Api.interceptors.request.use(async function (config) {
//   return config;
// });

const logDate = () => {
  const d = new Date();

  const now =
    d.getFullYear() +
    '-' +
    (d.getMonth() + 1) +
    '-' +
    d.getDate() +
    '_' +
    d.getHours() +
    '.' +
    d.getMinutes() +
    '.' +
    d.getSeconds();

  return now;
};

export const createFakeLog = async (num, logType) => {
  try {
    const response = await Api.get(`fakelog/manual/v1/${logType}/${num}`);
    console.log(response?.data);

    if (response?.data) {
      const jsonStringified = response?.data?.jsonData;

      let jsonDataSet =
        'data:text/json;charset=utf-8,' + encodeURIComponent(jsonStringified);
      let download = document.createElement('a');
      download.setAttribute('href', jsonDataSet);
      download.setAttribute('download', `${logType}-${logDate()}.json`);
      document.body.appendChild(download);
      download.click();
      download.remove();

      SuccessDialog(
        `You have successfully produced ${logType} type fakelog to download (Attack Number:${num})`
      );
    } else {
      ErrorDialog(
        `You can not download empty data for ${logType} type fakelog`
      );
    }
  } catch (error) {
    console.log(error);
    ErrorDialog(`Something went wrong while producing ${logType} type fakelog`);
  }
};

//! PERPETUAL FAKELOG
export const perpetualFakelog = async (typesWithActionsObj) => {
  // console.log("attackObject:", typesWithActionsObj);
  try {
    await Api.get(
      `/dashboard/fakelogperpetual/auto?obj=${JSON.stringify(
        typesWithActionsObj
      )}`
    );
  } catch (error) {
    ErrorDialog(
      `Something went wrong while producing for perpetual log actions`
    );
  }
};

export const perpetualLogList = async () => {
  try {
    return await Api.get('fakelog/auto/logs/v1/list/');
  } catch (error) {
    ErrorDialog('Something went wrong while perpetual log list is getting');
  }
};

export const perpetualLogPlay = async (logId) => {
  try {
    return await Api.get(`fakelog/auto/v1/play/${logId}`);
  } catch (error) {
    ErrorDialog('Something went wrong while perpetual log is played');
  }
};
export const perpetualLogPause = async (logId) => {
  try {
    return await Api.get(`fakelog/auto/v1/pause/${logId}`);
  } catch (error) {
    ErrorDialog('Something went wrong while perpetual log list is paused');
  }
};

export const perpetualLogUpdate = async (
  logId,
  lowerLimit,
  upperLimit,
  attackType
) => {
  const logData = {
    id: logId,
    lower_limit: lowerLimit,
    upper_limit: upperLimit,
    attack_type: attackType,
  };
  try {
    return await Api.post('/fakelog/auto/logs/v1/updateLogTypeInfo', logData);
  } catch (error) {
    ErrorDialog('Something went wrong while perpetual log list is updated');
  }
};
export const perpetualLogNew = async (lowerLimit, upperLimit, attackType) => {
  const logData = {
    id: 0,
    lower_limit: lowerLimit,
    upper_limit: upperLimit,
    attack_type: attackType,
  };
  try {
    return await Api.post('/fakelog/auto/logs/v1/updateLogTypeInfo', logData);
  } catch (error) {
    ErrorDialog('Something went wrong while perpetual log list is updated');
  }
};
