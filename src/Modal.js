import React from "react";
import "./Modal.css";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import InputMask from "react-input-mask";

const Modal = ({ employees, setFilteredEmployees, show, onClose }) => {
  //   const [editEmployeeData, setEditEmployeeData] = React.useState({
  //     name: "",
  //     role: "",
  //     phone: "",
  //     birthday: "",
  //     isArchive: false,
  //   });

  //   const editEmployeeHandler = (e) => {
  //     e.preventDefault();
  //     const { name, value } = e.target;
  //     setEditEmployeeData({ ...editEmployeeData, [name]: value });
  //   };

  //   const editEmployeeSubmit = (e) => {
  //     e.preventDefault();
  //     const payload = {
  //       id: props.employees.map((e) => e.id),
  //       name: editEmployeeData.name,
  //       role: editEmployeeData.role,
  //       phone: editEmployeeData.phone,
  //       birthday: editEmployeeData.birthday,
  //       isArchive: false,
  //     };

  //     const editEmployee = [...props.employees];
  //     const index = props.employees.findIndex(
  //       (data) => data.id === props.employees.id
  //     );
  //     editEmployee[index] = payload;
  //     props.setFilteredEmployees(editEmployee);
  //   };

  //   const [isArchived, setIsArchived] = React.useState(
  //     props.employees.isArchived
  //   );

  const id = employees.id;
  const [name, setName] = React.useState(employees.name);
  const [role, setRole] = React.useState(employees.role);
  const [phone, setPhone] = React.useState(employees.phone);
  const [birthday, setBirthday] = React.useState(employees.birthday);

  const updateEmployee = (id, updatedEmployee) => {
    setFilteredEmployees(
      employees.map((employee) =>
        employee.id === id ? updatedEmployee : employee
      )
    );
  };

  const updatedEmployee = { id, name, role, phone, birthday };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployee(id, updatedEmployee);
  };

  console.log(updatedEmployee);

  return (
    <div className={`popup ${show ? "popup_visible" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}>
          &times;
        </button>
        <form className="add-employee-form" onSubmit={handleSubmit}>
          <FilterCheckbox />
          <button className="form-button" type="button">
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
