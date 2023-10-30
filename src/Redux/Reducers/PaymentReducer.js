import {GET_PAYMENT_LIST} from '../Actions/types';

const initialstate = {
  GET_PAYMENT_LIST: [],
};

const PaymentReducer = (state = initialstate, action) => {
  //   console.log(
  //     'action.payloadaction.payloadaction.payloadaction.payload',
  //     action.payload,
  //   );
  switch (action.type) {
    case GET_PAYMENT_LIST:
      return {...state, GET_PAYMENT_LIST: action.payload};
  }

  return state;
};

export default PaymentReducer;
