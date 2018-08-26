export function bindActionCreator (actionCreator, dispatch) {
  return function boundActionCreator () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}

export default function bindActionCreators (actions, dispatch) {
  const keys = Object.keys(actions);
  const boundActionCreators = {};

  for (let i = 0; i < keys.length; i ++) {
    const key = keys[i];
    const actionCreator = actions[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
