import React from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#A3A3A3",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid #A3A3A3",
    "&:hover": {
      boxShadow: "0 0 0 8px #A3A3A3",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "#A3A3A3",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
}));

const AirbnbThumbComponent = (props) => {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
};

const CustomSlider = ({ SelectedRange, setSelectedRange }) => {
  const handleChange = (e) => {
    setSelectedRange(e.target.value);
  };

  return (
    <AirbnbSlider
      slots={{ thumb: AirbnbThumbComponent }}
      value={SelectedRange}
      onChange={handleChange}
      getAriaLabel={(index) =>
        index === 0 ? "Minimum price" : "Maximum price"
      }
    />
  );
};

export default CustomSlider;
