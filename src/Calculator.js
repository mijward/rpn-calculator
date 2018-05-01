import React, { Component } from 'react';
import './App.css';

//TODO: DELETE
// class CalculatorKeyGrid extends React.Component {
//   render () {

//     return (
//       <div>

//       </div>
//     )
//   }
// }
function CalculatorRegisterDisplay (props) {
  return (
    
     (
      <span className={`${props.className}`}>
        {props.value.map(val => {
          return val + ' ';
        })}
      </span>
    )
  )
}

function CalculatorDisplay (props) {
  return (
    <span className={`${props.className}`}>
      {props.value}
    </span>
  )
}

function CalculatorKey (props) {
  return (
    <button className={`calculator-key ${props.className}`} onClick={props.onClick} {...props}/>
  )
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: [],
      currentValue: '0',
    }
    
    this.registerValue = this.registerValue.bind(this);
    this.executeOperation = this.executeOperation.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
  }
  
  //state changer methods
  updateDisplay (digit) {
    this.setState(prevState =>({
      currentValue: prevState.currentValue === '0' ? digit : prevState.currentValue + digit,
    }))
  }
  
  registerValue() {
    const { expression, currentValue } = this.state;
    expression.push(currentValue);
    this.setState({
      expression,
      currentValue: '0'
     })
  }

  executeOperation(symbol) {
    const {expression} = this.state;
    let result = 0;
    if (expression.length > 1) {
      const val1 = Number(expression.pop());
      const val2 = Number(expression.pop());

      if (symbol === '+') {
        result = val2 + val1;
      } else if (symbol === '-') {
        result = val2 - val1;
      }
      expression.push(result);

    } else {
      //return error
    }
    this.setState ({
      expression,
    })
  }

  clearDisplay() {
    this.setState({
      expression: [],
      currentValue: '0'
    })
  }

  render () {
    const { expression, currentValue } = this.state;
    return(
      <div className="container">
        <div className="row">
          <CalculatorRegisterDisplay value={expression} className="input-display" />
        </div>
        <div className="row">
          <CalculatorDisplay value={currentValue} className="input-display" />
        </div>
        <div className="row">
          <CalculatorKey className="btn btn-dark" onClick={() => this.executeOperation('+')}>+</CalculatorKey>
          <CalculatorKey className="btn btn-dark" onClick={() => this.executeOperation('-')}>-</CalculatorKey>
          <CalculatorKey className="btn btn-dark"onClick={() => this.clearDisplay()}>AC</CalculatorKey>
        </div>
        <div className="row">
          <CalculatorKey className="btn btn-info" onClick={() => this.updateDisplay('7')}>7</CalculatorKey>
          <CalculatorKey className="btn btn-info" onClick={() => this.updateDisplay('8')}>8</CalculatorKey>
          <CalculatorKey className="btn btn-info" onClick={() => this.updateDisplay('9')}>9</CalculatorKey>
        </div>
        <div className="row">
          <CalculatorKey className="btn btn-info" onClick={() => this.updateDisplay('4')}>4</CalculatorKey>
          <CalculatorKey className="btn btn-info" onClick={() => this.updateDisplay('5')}>5</CalculatorKey>
          <CalculatorKey className="btn btn-info" onClick={() => this.updateDisplay('6')}>6</CalculatorKey>
        </div>
        <div className="row">
          <CalculatorKey className="btn btn-info" onClick={() => this.updateDisplay('1')}>1</CalculatorKey>
          <CalculatorKey className="btn btn-info" onClick={() => this.updateDisplay('2')}>2</CalculatorKey>
          <CalculatorKey className="btn btn-info" onClick={() => this.updateDisplay('3')}>3</CalculatorKey>
        </div>
        <div className="row">
          <CalculatorKey className="btn btn-info zero" onClick={() => this.updateDisplay('0')}>0</CalculatorKey>
        </div>
        <div className="row">
          <CalculatorKey className="btn btn-dark zero"onClick={() => this.registerValue()}>enter</CalculatorKey>
        </div>
      </div>
    );
  }
}

export default Calculator;
