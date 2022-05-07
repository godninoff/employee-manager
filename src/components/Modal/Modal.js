import React from "react";
import "./Modal.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import InputMask from "react-input-mask";
import store from "../../utils/store";

const Modal = ({
  filteredEmployees,
  setFilteredEmployees,
  show,
  onClose,
  employeeData,
}) => {
  const id = employeeData.id;
  const [name, setName] = React.useState(employeeData.name);
  const [role, setRole] = React.useState(employeeData.role);
  const [phone, setPhone] = React.useState(employeeData.phone);
  const [birthday, setBirthday] = React.useState(employeeData.birthday);

  const updatedEmployee = { id, name, role, phone, birthday };

  const handleSubmit = (e) => {
    e.preventDefault();
    store.dispatch({ type: "updateEmployees", updatedEmployee });
    onClose();
  };

  React.useEffect(() => {
    setName(employeeData.name);
    setRole(employeeData.role);
    setBirthday(employeeData.birthday);
    setPhone(employeeData.phone);
  }, [employeeData]);

  return (
    <div className={`popup ${show ? "popup_visible" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}>
          &times;
        </button>
        <form className="add-employee-form" onSubmit={handleSubmit}>
          <FilterCheckbox />
          <button className="form-button" type="submit">
            Изменить данные
          </button>
          <input
            type="text"
            name="name"
            minLength="2"
            maxLength="30"
            required
            placeholder="Фамилия Имя"
            pattern="[а-яА-ЯёЁa-zA-Z- ]{1,}"
            title="Фамилия и Имя должны состоять только из букв"
            className="form-input"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            list="role"
            name="role"
            placeholder="Должность"
            autoComplete="off"
            pattern="cook|waiter|driver"
            title="Выберите одно из значений"
            className="form-input"
            onChange={(e) => setRole(e.target.value)}
            value={role}
            required
          />
          <datalist id="role">
            <option value="cook" />
            <option value="waiter" />
            <option value="driver" />
          </datalist>
          <InputMask
            mask="+7 (999) 999-9999"
            type="text"
            name="phone"
            required
            placeholder="Номер телефона"
            className="form-input"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <InputMask
            mask="99.99.9999"
            type="text"
            name="birthday"
            required
            placeholder="Дата рождения"
            className="form-input"
            onChange={(e) => setBirthday(e.target.value)}
            value={birthday}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
