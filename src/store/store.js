import {createStore, applyMiddleware} from "redux"
import reducer from "@/store/reducer";
import reduxPromise from "redux-promise";
import reduxThunk from "redux-thunk";
import reduxLogger from "redux-logger";

const middleList = [reduxPromise, reduxThunk]

if (process.env.NODE_ENV === "development"){
  middleList.unshift(reduxLogger)
}
const store = createStore(reducer, applyMiddleware(...middleList))

export default store
