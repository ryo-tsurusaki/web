import { ActionTypes } from "../actionTypes";
import { UserActionTypes } from "./types";

export const setUserName = (userName: string) : UserActionTypes => ({
    name: userName,
    type: ActionTypes.set
})
