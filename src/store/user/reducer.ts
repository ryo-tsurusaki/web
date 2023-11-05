import { ActionTypes } from "../actionTypes";
import { User, UserActionTypes } from "./types";

const initialState : User = {
    name: undefined,
}

// eslint-disable-next-line default-param-last
export const UserReducer = (state = initialState, action: UserActionTypes) : User => {
    switch (action.type) {
        case ActionTypes.set:
            return { ...state, name: action.value }
        default:
            return state
    }
}