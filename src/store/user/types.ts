/* eslint-disable import/no-extraneous-dependencies */
import { Action } from "redux";
import { ActionTypes } from "../actionTypes";

export type User = {
    name : string
}

interface setUserNameAction extends Action {
    name: string,
    type: typeof ActionTypes.set,
}

export type UserActionTypes = setUserNameAction