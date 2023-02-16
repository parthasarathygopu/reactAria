
import React, {useState} from 'react';
import {Item} from 'react-stately';
import {Slider} from "./components/slider/index";
import {Select} from "./components/select/index";
import {ComboBox} from "./components/comboBox/index";

import './App.css';


function App() {
  const [value,setValue] = useState(["20"])
  const [color, setColor] = React.useState(null);
  const [currency, setCurrency] = React.useState("USD");
  const [currencyValue, setCurrencyValue] = React.useState(null);


  return (
    <div className="App">
          <Slider
        value={value}
        minValue={0}
        maxValue={100}
        onChange={(values) => {
          console.log("onChange", values);
          setValue(values);
        }}
        onChangeEnd={(values) => {
          console.log("onChangeend", values);
          setValue(values);
        }}
      />
      
      <div>
      <Select label="Dropdown" selectedKey={color}
        onSelectionChange={(value) => {
          setColor(value);
        }}>
          <Item key="red">Red</Item>
          <Item key="Orange">Orange</Item>
          <Item key="Yellow">Yellow</Item>
          <Item key="Green">Green</Item>
          <Item key="Blue">Blue</Item>
          <Item key="Purple">Purple</Item>
          <Item key="Black">Black</Item>
          <Item key="White">White</Item>
          <Item key="Lime">Lime</Item>
          <Item key="Fushsia">Fushsia</Item>
        </Select>
        </div>
        <div>
        <ComboBox label="currency" selectedKey={currency} currencyValue={currencyValue} onCurrencyValueChange={(event) => {
          setCurrencyValue(event.target.value);
        }} 
        onSelectionChange={(value) => {
          setCurrency(value);
        }}>
        <Item key="USD">USD</Item>
        <Item key="IST">IST</Item>
        <Item key="ASD">ASD</Item>
        <Item key="RUP">RUP</Item>
      </ComboBox>
      </div>
    </div>
    
  
  );
}

export default App;
