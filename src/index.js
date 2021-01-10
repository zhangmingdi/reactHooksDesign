import React, { memo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

let lastDependences

function useEffect1(fn, dependences) {
  if (lastDependences) {
    const isChange = !lastDependences.every((item, index) => {
      return item === dependences[index]
    })

    if (isChange) {
      setTimeout(fn, 0)
      lastDependences = dependences
    }

  } else {
    lastDependences = dependences
    setTimeout(fn, 0)
  }
}

let lastLayoutEffectDependences
function useELayoutEffect1(fn, dependences) {

  if (lastLayoutEffectDependences) {
    const isChange = !lastLayoutEffectDependences.every((item, index) => {
      return item === dependences[index]
    })

    if (isChange) {
      queueMicrotask(fn)
      lastLayoutEffectDependences = dependences
    }

  } else {
    queueMicrotask(fn)
    lastLayoutEffectDependences = dependences
  }
}

const App = () => {

  const [num, setNum] = useState(0)

  useELayoutEffect1(() => {
    console.log('微任务之后渲染执行之前', num)
  }, [num])

  useEffect1(() => {
    console.log('num的执行', num)
  }, [num])

  return (
    <div>
      <p>{num}</p>
      <button onClick={() => {
        const i = num + 1
        setNum(i)
      }}>num:{num}</button>
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
