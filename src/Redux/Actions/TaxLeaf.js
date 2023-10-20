import {LOGIN_DATA, MY_INFO, MANAGER_INFO, CLIENT_LIST} from './types';
import AsyncStorage from '@react-native-community/async-storage';
import axios, * as others from 'axios';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logistical} from '../../utils';

export const LoginUser = (email, navigation) => dispatch => {
  // dispatch({
  //   type: 'LOADING',
  //   payload: true,
  // });

  return new Promise(async (resolve, reject) => {
    let data = {
      staffview: {
        user: email,
      },
    };

    console.log(data, 'dataaaaaa');

    const response = await logistical.postlogin('/Staff/LoginStaff', data);
    console.log(response.token, 'responseresponseresponseresponse');

    if (response.failureStatus == false) {
      AsyncStorage.setItem('login', JSON.stringify(response.token));
      console.log(response.token, 'token');
      console.log(
        response.staffview,
        'staffviewinfostaffviewinfostaffviewinfostaffviewinfo',
      );

      dispatch({
        type: LOGIN_DATA,
        payload: response,
      });

      //   Alert.alert(response.response[0])
      resolve(response);

      // Alert.alert(response.massage);
      navigation.navigate('Auth');

      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
    } else {
      // Alert.alert(response.message)
      Alert.alert(response.massage);
      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
      reject(response);
    }
  });
};

export const clientInfo = (email, navigation) => dispatch => {
  // dispatch({
  //   type: 'LOADING',
  //   payload: true,
  // });

  return new Promise(async (resolve, reject) => {
    let data = {
      staffview: {
        user: email,
      },
    };
    const response = await logistical.post('/Staff/GetStaffById', data);
    console.log(response, 'respppClientInforespppClientInfo');

    if (response.failureStatus == false) {
      console.log(
        response.guestInfo,
        'guestInfoguestInfoguestInfoguestInfoguestInfoguestInfoguestInfoguestInfoguestInfo',
      );
      // AsyncStorage.setItem('login', JSON.stringify(response.token));

      dispatch({
        type: MY_INFO,
        payload: response,
      });

      //   Alert.alert(response.response[0])
      resolve(response);

      // Alert.alert(response.massage);
      // navigation.navigate('ClientInfo');

      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
    } else {
      // Alert.alert(response.message)
      Alert.alert(response.massage);
      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
      reject(response);
    }
  });
};

export const ManagerInfo = (clientId, clientType, navigation) => dispatch => {
  // dispatch({
  //   type: 'LOADING',
  //   payload: true,
  // });

  return new Promise(async (resolve, reject) => {
    let data = {
      clientInfo: {
        clientId: clientId,
        clientType: clientType,
      },
    };
    const response = await logistical.post('/Staff/GetManagerInfo', data);
    console.log(response.managerInfo, 'managerInfomanagerInfomanagerInfo');

    if (response) {
      // AsyncStorage.setItem('login', JSON.stringify(response.token));

      dispatch({
        type: MANAGER_INFO,
        payload: response,
      });

      //   Alert.alert(response.response[0])
      resolve(response);

      // Alert.alert(response.massage);
      // navigation.navigate('ClientInfo');

      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
    } else {
      Alert.alert('No data found');
      //Alert.alert(response.massage);
      // dispatch({
      //   type: 'LOADING',
      //   payload: false,
      // });
      reject(response);
    }
  });
};

export const ClientInfoList =
  (clientId, clientType, navigation) => dispatch => {
    // dispatch({
    //   type: 'LOADING',
    //   payload: true,
    // });

    return new Promise(async (resolve, reject) => {
      let data = {
        GuestInfo: {
          clientId: clientId,
          clientType: clientType,
        },
      };
      const response = await logistical.post('/Staff/GetAssociateList', data);
      console.log(
        response.associateListInfo,
        'ClientLIstClientLIstClientLIstClientLIst',
      );

      if (response) {
        // AsyncStorage.setItem('login', JSON.stringify(response.token));

        dispatch({
          type: CLIENT_LIST,
          payload: response.associateListInfo,
        });

        //   Alert.alert(response.response[0])
        resolve(response);

        // Alert.alert(response.massage);
        // navigation.navigate('ClientInfo');

        // dispatch({
        //   type: 'LOADING',
        //   payload: false,
        // });
      } else {
        Alert.alert('No data found');
        //Alert.alert(response.massage);
        // dispatch({
        //   type: 'LOADING',
        //   payload: false,
        // });
        reject(response);
      }
    });
  };
