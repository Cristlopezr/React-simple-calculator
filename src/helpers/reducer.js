import { actionTypes } from './calculatorButtonTypes';

export const ACTIONS = {
  CONCAT_NUMBER: 'concat_number',
  ACTION: 'action',
  COMPUTE: 'compute',
};

const initialState = {
  bigText: '0',
  smallText: '',
  operation: '',
  lastNumber: 0,
  previousNumber: '',
  canRestartResultText: false,
  canRestartCalculator: false,
  disableButtons: false,
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.CONCAT_NUMBER:
      if (state.canRestartCalculator) return initialState;

      if (state.canRestartResultText)
        return {
          ...state,
          bigText: '0',
          canRestartResultText: false,
          lastNumber: 0,
        };

      if (payload === ',') {
        if (state.bigText.includes('.')) return state;

        return {
          ...state,
          bigText: state.bigText + '.',
        };
      }

      if (state.bigText === initialState.bigText)
        return {
          ...state,
          bigText: payload,
          lastNumber: Number(payload),
        };

      return {
        ...state,
        bigText: state.bigText + payload,
        lastNumber: Number(state.bigText + payload),
      };

    case ACTIONS.ACTION:
      if (payload === actionTypes.percentage) return state;
      if (payload === actionTypes.restart) return initialState;
      if (payload === actionTypes.deleteLeft) {
        if (state.bigText.length === 1)
          return {
            ...state,
            bigText: initialState.bigText,
          };
        return {
          ...state,
          bigText: state.bigText.slice(0, -1),
        };
      }

    case ACTIONS.COMPUTE:

    default:
      return state;
  }
};
