const { createStore } = require('redux');

const initialState = {
  num: 21
};

const myReducer = (state = initialState, action) => {
  const newState = {...state};

  if(action.type === 'ADD') {
    newState.num += action.val;
  }
  if(action.type === 'SUBSTRACT') {
    newState.num -= action.val;
  }

  return newState;
};

const store = createStore(myReducer);

// state가 변할 때마다 자동으로 실행된다.
store.subscribe(() => {
  console.log('state changed', store.getState());
})

store.dispatch({type: 'ADD', val: 10});
store.dispatch({type: 'SUBSTRACT', val: 5});
