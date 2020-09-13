import React, { useState } from "react";
import "./App.css";
import Slider from "./Slider";
import SidebarItem from "./SidebarItem";

const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Hue rotate",
    property: "hue-rotate",
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: "deg",
  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: "px",
  },
];

function App() {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const selectedOption = options[selectedOptionIndex];
  const handleClick = ({ target }, index) => {
    setSelectedOptionIndex(index);
  };

  const handleChange = ({ target: { value } }) => {
    setOptions((prevOpt) =>
      prevOpt.map((option, index) => {
        if (index !== selectedOptionIndex) {
          return option;
        }
        return { ...option, value };
      })
    );
  };
  function getImgStyle() {
    const filters = options.map(({ unit, property, value }) => {
      return `${property}(${value}${unit})`;
    });
    return { filter: filters.join(" ") };
  }
  return (
    <div className="container">
      <div className="main-image" style={getImgStyle()} />
      <div className="sidebar">
        {options.map(({ name }, index) => (
          <SidebarItem
            key={name + index}
            name={name}
            active={index === selectedOptionIndex}
            handleClick={(e) => handleClick(e, index)}
          />
        ))}
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleChange}
      />
    </div>
  );
}

export default App;
