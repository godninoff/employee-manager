import "./FilterCheckbox.css";

const FilterCheckbox = (props) => {
  return (
    <label className="search__toggle-checkbox">
      <input
        type="checkbox"
        className="checkbox"
        checked={props.archived}
        name="short"
        id="box"
        onChange={props.checkboxSwitcher}
      />
      В архиве
    </label>
  );
};

export default FilterCheckbox;
