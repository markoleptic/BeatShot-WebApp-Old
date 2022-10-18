import Select from "react-select";

const CustomSelect = (props) => {

  const selectStyles = {
    menu: (provided, state) => ({
      ...provided,
      marginTop: 0,
      borderRadius: 0,
      fontSize: 14,
      opacity: state.menuIsOpen ? 1 : 0,
      transition: "all 120ms ease-in-out",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "hsl(193, 81%, 58%)" : "white",
      textAlign: "left",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "hsl(193, 81%, 58%)",
        transition: "all 120ms ease-out",
      },
    }),
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: 0,
      width: "100%",
      textAlign: "left",
      cursor: "pointer",
    }),
    dropdownIndicator: (provided,state) => ({
      ...provided,
      color: state ? "hsl(193, 81%, 58%)" : "hsl(215, 91%, 9%)",
      "&:hover": {
        color: "#9ee2f5",
        transition: "all 200ms ease-out",
      },
    }),
    indicatorSeparator: (provided,state) => ({
      ...provided,
      backgroundColor: state.isMenuOpen ? "hsl(193, 81%, 58%)" : "hsl(215, 91%, 9%)",
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
  };
  
  return (
    <>
        <div className="select-wrapper">
          <h4>{props.selectTitle}</h4>
          <div>
            <Select
              className="select"
              options={props.options}
              placeholder={props.placeholder}
              onChange={props.onChange}
              styles={selectStyles}
            />
          </div>
        </div>
    </>
  );
};
export default CustomSelect;