import { useState } from "react";
import Select from "react-select";

export const coloredSelectStyles = (menuOpen) => ({
  menu: (provided) => {
    return {
      ...provided,
      marginTop: 0,
      fontSize: 14,
      cursor: "pointer",
      opacity: menuOpen ? 1 : 0,
      transition: "all 120ms ease-in",
    };
  },
  option: (provided, state) => {
    return {
      ...provided,
      cursor: "pointer",
      backgroundColor: state.isSelected ? "hsl(193, 81%, 58%)" : "white",
      "&:hover": {
        backgroundColor: state.isSelected ? "hsl(193, 81%, 58%)" : "#9ee2f5",
        transition: "all 120ms ease-out",
      },
    };
  },
  container: (provided) => {
    return {
      ...provided,
      width: "100%",
    };
  },
  control: (provided) => {
    return {
      ...provided,
      cursor: "pointer",
      width: "100%",
      textAlign: "left",
    };
  },
  dropdownIndicator: (provided) => ({
    ...provided,
    color: menuOpen ? "hsl(193, 81%, 58%)" : "hsl(215, 91%, 9%)",
    "&:hover": {
      color: "#9ee2f5",
      transition: "all 150ms ease-out",
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: menuOpen ? "hsl(193, 81%, 58%)" : "hsl(215, 91%, 9%)",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
    paddingLeft: 2,
    paddingRight: 2,
  }),
  singleValue: (provided) => ({
    ...provided,
  }),
});

const SelectBox = ({ options, onChange, placeholder }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  return (
    <>
      <div onClick={() => setMenuIsOpen(!menuIsOpen)}>
        <Select
          className="game-mode-select"
          id="game-mode-select"
          options={options}
          onChange={onChange}
          placeholder={placeholder}
          styles={coloredSelectStyles(menuIsOpen)}
        />
      </div>
    </>
  );
};

export default SelectBox;

const getColor = (state, mode = "nonhover") => {
  switch (mode) {
    case "hover":
      return state?.value?.includes("game-mode-select")
        ? "rgba(255, 0, 0, 0.52)"
        : "rgba(43, 192, 233, 0.5)"; // "hsl(193, 81%, 58%)";
    default:
      return state?.value?.includes("game-mode-select")
        ? "rgba(255, 0, 0, 0.9)"
        : "rgba(43, 192, 233, 1)";
  }
};
