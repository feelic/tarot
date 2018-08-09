import {DEAL} from '../constants/action-types';

const initialState = [];

/**
 * Reducer for the Author details
 *
 * @param  {Object} state current state
 * @param  {Object} action action to perform
 * @return {Object} nextState next state
 */
export default function data (state = initialState, action) {
  switch (action.type) {
  case DEAL:
    return action.chien;
  default:
    return state;
  }
}
