import React from "react";
import InputMask from "react-input-mask";
import store from "../../utils/store";

const AddEmployeeForm = () => {
  const [addEmployeeData, setAddEmployeeData] = React.useState({
    name: "",
    role: "",
    phone: "",
    birthday: "",
  });

  const addEmployeeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddEmployeeData({ ...addEmployeeData, [name]: value });
  };

  const addEmployeeSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: addEmployeeData.name,
      role: addEmployeeData.role,
      phone: addEmployeeData.phone,
      birthday: addEmployeeData.birthday,
      isArchive: false,
    };

    store.dispatch({ type: "addEmployees", payload });
  };

  return (
    <div>
      <form className="add-employee-form" onSubmit={addEmployeeSubmit}>
        <button className="form-button" type="submit">
          Добавить сотрудника
        </button>
        <input
          type="text"
          name="name"
          minLength="2"
          maxLength="30"
          required
          placeholder="Фамилия Имя"
          pattern="[а-яА-ЯёЁa-zA-Z- ]{1,}"
          onChange={addEmployeeHandler}
          title="Фамилия и Имя должны состоять только из букв"
          className="form-input"
        />
        <input
          list="role"
          name="role"
          placeholder="Должность"
          onChange={addEmployeeHandler}
          autoComplete="off"
          pattern="cook|waiter|driver"
          title="Выберите одно из значений"
          className="form-input"
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
          onChange={addEmployeeHandler}
          className="form-input"
        />
        <InputMask
          mask="99.99.9999"
          type="text"
          name="birthday"
          required
          placeholder="Дата рождения"
          onChange={addEmployeeHandler}
          className="form-input"
        />
      </form>
    </div>
  );
};

export default AddEmployeeForm;
