// eslint-disable-next-line import/no-extraneous-dependencies
import { Action } from 'redux';
import { ActionTypes } from '../actionTypes';

export type User = {
  name: string | undefined;
};

interface setUserNameAction extends Action {
  type: typeof ActionTypes.set;
  value: string | undefined;
}

export type UserActionTypes = setUserNameAction;
