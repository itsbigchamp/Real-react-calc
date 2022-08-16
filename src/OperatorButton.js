import { FUNCTIONS } from "./App";

export default function OperatorButton({ dispatch, operation}) {
    return (
        <button
          onClick={() =>
            dispatch({ type: FUNCTIONS.CHOOSE_OPERATION, payload:{ operation } })
        }
        >
            {operation}
        </button>
    )
}