import { createAction, handleActions } from 'redux-actions';

const CHANGE_INPUT ='wating/CHANGE_INPUT'; // 인풋 값 변경
const CREATE = 'waiting/CREATE'; // 명단에 이름 추가
const ENTER = 'wating/ENTER'; // 입장
const LEAVE = 'wating/LEAVE'; // 퇴장


let id = 3;
// 액션 생성 함수
export const changeInput = createAction(CHANGE_INPUT, text => text);
export const create = createAction(CREATE, text => ({ text, id: id++}));
export const enter = createAction(ENTER, id => id);
export const leave = createAction(LEAVE, id => id);

// 초기 상태 정의
const initialState = {
  input: '',
  list: [
    {
      id: 0,
      name: '홍길동',
      entrered: true,
    },
    {
      id: 1,
      name: '콩쥐',
      entrered: false,
    },
    {
      id: 2,
      name: '팥쥐',
      entrered: false
    },
  ],
}

// handleActions로 리듀서 함수 작성

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      input: action.payload,
    }),
    [CREATE]: (state, action) => ({
      ...state,
      list: state.list.concat({
        id: action.payload.id,
        name: action.payload.text,
        entered: false,
      }),
    }),
    [ENTER]: (state, action) => ({
      ...state,
      list: state.list.map(
        item => 
          item.id === action.payload 
            ? {...item, entered: !item.entrered}
            : item
        ),
    }),
    [LEAVE]: (state, action) => ({
      ...state,
      list: state.list.filter(item => item.id !== action.payload),
    }),
  },
  initialState
);