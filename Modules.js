/*
reducers/ function(initalState,action){
    type: 'SOMECONST',
    payload: {
        data
    }
}
*/
const PRESS_NUM = 'PRESS_NUM';
const ENTER = 'ENTER';
const OPERATION = 'OPERATION';
const CLEAR = "CLEAR";
const SWAP = "SWAP";
const TOGGLE_NEGATIVE = "TOGGLE_NEGATIVE";



// inputState = append | replace | push


export const pressNum = n => ({
  type: PRESS_NUM,
  payload: n,
});

export const enter = () => ({
  type: ENTER,
});

export const operation = op => ({
  type: OPERATION,
  payload: op,
});

export const clear = () => ({
  type: CLEAR,
});

export const swap = () => ({
  type: SWAP,
});

export const toggleNegative = idx => ({
  type: TOGGLE_NEGATIVE,
  payload: idx,
});

const doOperation = ( x, y, op) => {
  const a = parseFloat(x);
  const b = parseFloat(y);
    
  if (op === 'pow') {
    return b ** a;
  } else if ( op === '+') {
    return b + a;
  } else if ( op === '-') {
    return b - a;
  } else if ( op === 'X') {
    return b * a;
  } else if ( op === '/') {
    return b / a;
  }
  return 0;
};

const initialState = { stack: [], inputState: 'replace'};

const switchNegative = (x) => {
  if (x.startsWith('-')) {
    return x.slice(1);
  } else {
    return `-${x}`;
  }
};

export const reducer = ( state = { stack: [], inputState: 'replace' }, { type, payload }) => {
  switch (type) {
    case TOGGLE_NEGATIVE:
      return {
        stack: state.stack.map((x, i) => (payload === i ? switchNegative(x) : x)),
        inputState: state.inputState,
      };
    case SWAP:
      return {
        stack: [state.stack[1], state.stack[0], ...state.stack.slice(2)],
        inputState: 'push',
      }
    case CLEAR:
      return initialState;
    case OPERATION:
      return {
        stack: [`${doOperation(state.stack[0], state.stack[1], payload)}`, ...state.stack.slice(2)],
        inputState: 'push',
      };
    case ENTER:
      return {
        stack: [state.stack[0] || '0', ...state.stack], //keep current stack (green) and go back to replace
        inputState: 'replace',
      };
    case PRESS_NUM:
      if (state.inputState === 'append') {
        return {
          stack: [(state.stack[0] || '0') + payload, ...state.stack.slice(1)], // takes first value (0) off but keeps the rest of stack
          inputState: 'append',
        };
      } else if (state.inputState === 'replace') {
        return {
          ...state, //grab initial state but optional since we're replacing it anyway
          stack: [payload, ...state.stack.slice(1)], //"replace" current stack slicing off first val adding n
          inputState: 'append', //pass in new inputState
        };
      } else if (state.inputState === 'push') {
        return {
          stack: [payload, ...state.stack],
          inputState: 'append',
        };
      }
      break;
    default:
      return state;
  }
};
