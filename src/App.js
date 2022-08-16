import { useReducer } from 'react';
import NumberButton from './NumberButton';
import OperatorButton from './OperatorButton';
import './styles.css';

export const FUNCTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
}

function reducer(state, {type, payload}) {
  switch (type) {
    case FUNCTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      if(payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if(payload.digit === "." && state.currentOperand.includes(".")){
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case FUNCTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.currentOperand == null) {
        return{
          ...state,
          operation: payload.operation,
        }
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }
    case FUNCTIONS.CLEAR:
      return {}
    case FUNCTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      }
    case FUNCTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current 
      break
  }
  return computation.toString()
}

const INTEGER_DISPLAYER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_DISPLAYER.format(integer)
  return `${INTEGER_DISPLAYER.format(integer)}.${decimal}`
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  )

  return (
   <div className='calculator-grid'>
    <div className='output'>
      <div className='previous-operand'>
        {formatOperand(previousOperand)} {operation}
      </div>
      <div className='current-operand'>{formatOperand(currentOperand)}</div>
    </div>
    <button
      className="span-two"
      onClick={() => dispatch({ type: FUNCTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: FUNCTIONS.DELETE_DIGIT})}>
        DEL
      </button>
      <OperatorButton operation="÷" dispatch={dispatch}/>
      <NumberButton digit="1" dispatch={dispatch}/>
      <NumberButton digit="2" dispatch={dispatch}/>
      <NumberButton digit="3" dispatch={dispatch}/>
      <OperatorButton operation="*" dispatch={dispatch}/>
      <NumberButton digit="4" dispatch={dispatch}/>
      <NumberButton digit="5" dispatch={dispatch}/>
      <NumberButton digit="6" dispatch={dispatch}/>
      <OperatorButton operation="+" dispatch={dispatch}/>
      <NumberButton digit="7" dispatch={dispatch}/>
      <NumberButton digit="8" dispatch={dispatch}/>
      <NumberButton digit="9" dispatch={dispatch}/>
      <OperatorButton operation="-" dispatch={dispatch}/>
      <NumberButton digit="." dispatch={dispatch}/>
      <NumberButton digit="0" dispatch={dispatch}/>
      <button
        className="span-two"
        onClick={() => dispatch({ type: FUNCTIONS.EVALUATE})}
        >
          =
        </button>
   </div>
  );
}

export default App;
