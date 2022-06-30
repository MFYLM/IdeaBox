import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TheIdexBox from "./IdeaBox";
import Box from "./test";
import reportWebVitals from './reportWebVitals';
import APIs from "./apis";


class TableControl extends React.Component {
  constructor(props) {
    super(props);
    this.clickShowButton = this.clickShowButton.bind(this);
    this.clickCloseButton = this.clickCloseButton.bind(this);
    this.state = {isClick: false};
  }
  
  clickShowButton() {
    this.setState({isClick: true});
  }

  clickCloseButton() {
    this.setState({isClick: false});
  }

  /*
  handleClick() {
    console.log(this.state); 
    // uses setState to change the state, (this.state --> access the state)
    this.setState(
      state => ({text: "Hello! Feiyang Ma"})
    
    );
  }
  */

// <button onClick={() => this.handleClick()}>show data</button>
// <p isClick={false}>{this.state.text}</p>
  
  render() {
    const isClick = this.state.isClick;
    let button;
    if (isClick) {
      button = <CloseButton onClick = {this.clickCloseButton}/>;
    } else {
      button = <ShowButton onClick = {this.clickShowButton}/>;
    }


    return (
      <div className = "people-list">
        <p>To see Feiyang Ma's information, click the button {button}</p>
        {
          isClick ? <Information isClick = {isClick} name="Feiyang Ma" race="Asain" age="21" height="179cm" weight="67kg"/> : ""
        }
      </div>
    );
  }
}


class FormControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isShow: false, value: "", name: "", isClick: false};
    this.setFalse = this.setFalse.bind(this);               // .bind method pass data as an argument to the function of a class based component
    this.setTrue = this.setTrue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.changeState = this.changeState.bind(this);
    
  }
  
  
  changeState() {
    if (this.state.isClick) {                              // this.state. cannot access the state in class component?
      this.setState({isClick: false});
    } else {
      this.setState({isClick: true});
    }
    
  }
  

  setFalse() {
    this.setState({isShow: false});
  }

  setTrue() {
    this.setState({isShow: true});
  }


  
 // how event is detected by  
  handleSubmit(event) {
    this.setState({name: event.target.elements[0].value});
    this.setState({value: event.target.elements[1].value});
    this.setState({isClick: true});
    //alert("The submitted name is: " + this.state.name);
    event.preventDefault();

  }

  handleSubmit2(event) {
    //this.changeState(event);
    this.setState({value: event.target.value});
    alert("The submitted value is: " + this.state.value);
    event.preventDefault();

  }

  handleInput(event) {
    this.setState({value: event.target.value});
  }

  handleChange(event) {
    this.setState({name: event.target.value});        // event.target.value == "input value" in <input />
  }

  render() {
    const isShow = this.state.isShow;
    const isClick = this.state.isClick;
    const info = this.state.name + this.state.value;
    
    let button;
    if (isShow) {
      button = <CloseButton onClick={this.setFalse} />;
    } else {
      button = <ShowButton onClick={this.setTrue} />;
    }


    // type: text, number, submit                                   "hidden" string?
    // Name:          <input> cannot show the value I want             
    return (
      <div className="sample form">
        <p>To see more information, click button {button}</p>
        {
          isShow ? <TextList isShow={isShow} texts={element}/> : ""
        }
        <hr></hr>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name: <input name="name" type="text" />
          </label>

          <label>
            Information: <input name="info" type="text" />
          </label>
          <input type="submit" value="submit" />
          
        </form>
        {
          isClick ? <p>{info} </p> : ""
        }
        
      </div>
    );
  }
}

// any event could happen in any tag?
// in form  no onclick?
// <ChangeState /> --> function component( or import ) use as a component
/*
function ChangeState() {
  const [value] = useState(false);     // value: the current state; setValue: a function to change value; false: default value   useState usage?
  if (value) {
    this.setState({isShow: false});
  } else {
    this.setState({isShow: true});
  }
}
*/
// event could trigger more funtion ?      event.target.  to access 



const element = [
  {id: 1, name: "Feiyang Ma", age: "21", height: "179cm", weight: "67kg"},
  {id: 2, name: "V", age: "28", height: "179cm", weight: "60kg"},
  {id: 3, name: "Jack", age: "35", height: "185cm", weight: "80kg"}
];

const options = [
    {label: "Array", value: "array"},
    {label: "String", value: "string"},
    {label: "Data Structure", value: "data structure"},
    {label: "Algorithm", value: "algorithm"},
    {label: "Dynamic Programming", value: "dp"}
]


function Information(props) {
  return <p>{props.name}, {props.race}, {props.age} years old, {props.height} height, weight {props.weight}.</p>;
}

const DropDown = ({label, value, options, onChange}) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};

function DropBox({label, options}) {
  //const [value, setValue] = useState("array");

  const [selectedValue, setSelectedValue] = useState("");

  function handleValueChange(event) {
    setSelectedValue(event.target.value);
  }

  /*
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  }
  */
  
  /*
  const options = [
    {label: "Array", value: "array"},
    {label: "String", value: "string"},
    {label: "Data Structure", value: "data structure"},
    {label: "Algorithm", value: "algorithm"},
    {label: "Dynamic Programming", value: "dp"}
  ]
  */

  // map function take in one element from a sequence and create a series of elements
  return (
    <div>
      <DropDown 
        label={label}
        options={options}
        value={selectedValue}
        onChange={handleValueChange}
      />

      <p>you would like to explore {selectedValue}!</p>
    </div>
  );
}




function CloseButton(props) {
  return (
    <button onClick = {props.onClick}>
      close data
    </button>
  );
}


function ShowButton(props) {
  return (
    <button onClick = {props.onClick}>
      show data
    </button>
  );
}


// TextList --> key needs to use for binding elements in the list(for map() usage )

function TextList(props) {
  const texts = props.texts;
  const newList = texts.map((text) => 
    <p key={text.id}>                                            
      {text.name} {text.age} {text.height} {text.weight}
    </p>
  );


  return (
    <ul>{newList}</ul>
  );
}



function TestBackend() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  })

}


ReactDOM.render(
  <div>
    <App />
    <TheIdexBox />
    <TableControl />
    <ul></ul>
    <FormControl />
    <APIs />
    <DropBox 
      label="Which topic do you want to explore?"
      options={options}
    />
  </div>,
  document.getElementById('root')
);






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
