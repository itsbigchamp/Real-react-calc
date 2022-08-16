import { FUNCTIONS } from "./App";

export default function NumberButton({ dispatch, digit }) {
    return (
        <button
         onClick={() => dispatch({ type: FUNCTIONS.ADD_DIGIT, payload: {digit} })}
         >
            {digit}
         </button>
    )
}