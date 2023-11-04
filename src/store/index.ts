/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers, createStore } from "redux";
import { UserReducer } from "./user/reducer";

const RootReducer = combineReducers({
    user: UserReducer,
})

export type RootState = ReturnType<typeof RootReducer>

const store = createStore(RootReducer)
export default store