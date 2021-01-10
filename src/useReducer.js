import React, { memo, } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const reducer = (state, action) => {

  if (action.type === 'success') {
    return state + 1
  } else {
    return state
  }

}

let lastState

function useReducer(reducer, initState) {
  lastState = lastState || initState

  function dispatch(action) {
    lastState = reducer(lastState, action)
    render()
  }

  return [lastState, dispatch]

}

const App = () => {

  const [number, dispatch] = useReducer(reducer, 0)



  return (
    <div>
      <p>{number}</p>
      <button
        onClick={() => {
          dispatch({ type: 'success' })
        }}
      >{number}</button>
    </div>
  )
}

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

render()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
