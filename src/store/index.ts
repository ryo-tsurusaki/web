/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers, createStore, applyMiddleware } from "redux";
import { createLogger } from 'redux-logger'
import { UserReducer } from "./user/reducer";

const RootReducer = combineReducers({
    user: UserReducer,
})

const logger = createLogger({
    diff:true,
    collapsed:true,
});

export type RootState = ReturnType<typeof RootReducer>

const store = createStore(
    RootReducer,
    applyMiddleware(logger)
    )
export default store