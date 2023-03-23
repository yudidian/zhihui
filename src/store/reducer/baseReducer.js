import utils from "@/utils/utils"
import {BASE_INFO} from "@/store/action-types";

const initState = {
  token: localStorage.getItem("token") || ''
}
const BaseReducer = (state= initState, actions) =>{
  state = utils.clone(state)
  switch (actions.type) {
    case BASE_INFO: {
      state.token = actions.token
      break;
    }
    default: {}
  }
  return state
}
export default BaseReducer
