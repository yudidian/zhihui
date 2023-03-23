import {combineReducers} from "redux"
import BaseReducer from "@/store/reducer/baseReducer";

const reducer = combineReducers({
  base: BaseReducer
})

export default reducer
