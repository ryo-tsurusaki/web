import { ActionTypes } from '../actionTypes';
import { User, UserActionTypes } from './types';

const initialState: User = {
  name: undefined,
};

export const UserReducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: UserActionTypes,
): User => {
  switch (action.type) {
    case ActionTypes.set:
      return { ...state, name: action.value };
    default:
      return state;
  }
};
