import { Action } from "redux";
import { ActionTypes } from "../actionTypes";

export type User = {
    name : string
}

interface setUserNameAction extends Action {
    type: typeof ActionTypes.set,
    value: string
}

export type UserActionTypes = setUserNameAction