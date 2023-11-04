import { ActionTypes } from "../actionTypes";
import { UserActionTypes } from "./types";

export const setUserName = (userName: string) : UserActionTypes => ({
    type: ActionTypes.set,
    value: userName
})
