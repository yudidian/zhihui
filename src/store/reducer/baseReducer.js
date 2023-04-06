import utils from '@/utils/utils';
import { BASE_INFO, USER_INFO } from '@/store/action-types';

const initState = {
  token: localStorage.getItem('token') || '',
  userInfo: null
};
const BaseReducer = (state= initState, actions) =>{
  state = utils.clone(state);
  switch (actions.type) {
  case BASE_INFO: {
    localStorage.removeItem('token');
    localStorage.setItem('token', actions.token);
    state.token = actions.token;
    break;
  }
  case USER_INFO: {
    state.userInfo = actions.userInfo;
    break;
  }
  }
  return state;
};
export default BaseReducer;
