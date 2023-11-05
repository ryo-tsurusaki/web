import { ActionTypes } from '../actionTypes';
import { UserActionTypes } from './types';

export const setUserName = (userName: string | undefined): UserActionTypes => ({
  type: ActionTypes.set,
  value: userName,
});
