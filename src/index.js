import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

let stateList = []
let index = 0

function useState(initState) {
  stateList[index] = stateList[index] || initState
  const currentIndex = index
  console.log('初始化为0', stateList, currentIndex)
  function setState(newState) {
    console.log('改变第一次的状态', stateList, currentIndex)
    stateList[currentIndex] = newState
    render()
  }


  console.log('初始化的状态', stateList)

  return [stateList[index++], setState]

}

let lastCallback
let lastCallbackDependences

function useCallback(callback, dependences) {

  if (lastCallbackDependences) {
    const isChange = !lastCallbackDependences.every((item, index) => {
      return item === dependences[index]
    })

    if (isChange) {
      lastCallback = callback
      lastCallbackDependences = dependences
    }
  } else {
    lastCallback = callback
    lastCallbackDependences = dependences
  }
  return lastCallback
}


let lastMemo
let lastMemoDependences

function useMemo(callBack, dependences) {

  if (lastMemoDependences) {
    const isChange = !lastMemoDependences.every((item, index) => {
      return item === dependences[index]
    })
    if (isChange) {
      lastMemo = callBack()
      lastCallbackDependences = dependences
    }
  } else {
    lastMemo = callBack()
    lastMemoDependences = dependences
  }
  return lastMemo
}

function _Child({ data, addClick }) {

  console.log('ssss', '子组件已经更新了')
  return (
    <button onClick={addClick}>{data.number}</button>
  )
}

const Child = memo(_Child)

const App = () => {

  let [number, setNumber] = useState(0)
  let [name, setName] = useState('zhengfeg')

  let addClick = useCallback(() => setNumber(number + 1), [number])
  let data = useMemo(() => ({ number }), [number])

  return (
    <div>
      <input value={name} type="text" onChange={e => { setName(e.target.value) }} />
      <Child data={data} addClick={addClick} />
    </div>
  )
}

function render() {
  index = 0
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
