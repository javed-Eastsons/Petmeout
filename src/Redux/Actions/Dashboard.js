import {DASHBOARD_LIST, DASHBOARD_MESSAGE_LIST} from './types';

import AsyncStorage from '@react-native-community/async-storage';
import axios, * as others from 'axios';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logistical} from '../../utils';

export const dashboardlist =
  (clientId, clientType, OfficeId, navigation) => dispatch => {
    // dispatch({
    //   type: 'LOADING',
    //   payload: true,
    // });

    console.log(
      clientId,
      clientType,
      OfficeId,
      'clientId, clientTypeclientId, clientType',
    );

    return new Promise(async (resolve, reject) => {
      let data = {
        GuestInfo: {
          ClientId: clientId,
          ClientType: clientType,
          OfficeId: OfficeId,
        },
        StartDate: '2023-08-27T09:22:46.571Z',
        EndDate: '2023-10-27T09:22:46.571Z',
      };
      const response = await logistical.post('/Staff/DashboardInfo', data);
      //  console.log(response, 'PaymentListPaymentListPaymentListPaymentList');

      if (response.failureStatus == false) {
        console.log(response, 'dashboarddashboarddashboard');
        // AsyncStorage.setItem('login', JSON.stringify(response.token));

        dispatch({
          type: DASHBOARD_LIST,
          payload: response.newsandupdatelist,
        });

        dispatch({
          type: DASHBOARD_MESSAGE_LIST,
          payload: response.actionmodel,
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
