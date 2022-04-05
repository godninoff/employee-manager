import "./App.css";
import React from "react";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import InputMask from "react-input-mask";
import { connect } from "react-redux";
import store from "./store";
import Header from "./Header";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import Modal from "./Modal";

const App = ({ employees }) => {
  const [filteredEmployees, setFilteredEmployees] = React.useState([]);
  const [roleList, setRoleList] = React.useState("none");
  const [isArchived, setIsArchived] = React.useState(false);
  const [sortListByBirth, setSortListByBirth] =
    React.useState("birthdayInitial");
  const [sortListByName, setSortListByName] = React.useState("nameInitial");

  const sortedByBirth = () => {
    if (sortListByBirth === "birthdayInitial") {
      setSortListByBirth("birthday");
      setSortListByName("nameInitial");
    } else {
      if (sortListByBirth === "birthdayReverse") {
        setSortListByBirth("birthday");
        setSortListByName("nameInitial");
        return;
      }
      setSortListByBirth("birthdayReverse");
      setSortListByName("nameInitial");
    }
  };

  const sortedByName = () => {
    if (sortListByName === "nameInitial") {
      setSortListByName("nameIncrease");
    } else {
      if (sortListByName === "nameDecrease") {
        setSortListByName("nameIncrease");
        return;
      }
      setSortListByName("nameDecrease");
    }
  };

  const sortEmployees = (roleList, isArchived, employees, birthday, name) => {
    let result = [...employees];

    if (isArchived) {
      result = result.filter(({ isArchive }) => isArchive);
    }

    if (roleList !== "none") {
      result = result.filter(({ role }) => role === roleList);
    }

    if (birthday !== "birthdayInitial") {
      if (birthday === "birthday") {
        result.sort((a, b) =>
          moment(a.birthday, "DD.MM.YYYY") < moment(b.birthday, "DD.MM.YYYY")
            ? 1
            : -1
        );
      }
      if (birthday === "birthdayReverse") {
        result.sort((a, b) =>
          moment(a.birthday, "DD.MM.YYYY") > moment(b.birthday, "DD.MM.YYYY")
            ? 1
            : -1
        );
      }
    }

    if (name !== "nameInitial") {
      if (name === "nameIncrease") {
        result.sort((a, b) => (a.name > b.name ? 1 : -1));
      }
      if (name === "nameDecrease") {
        result.sort((a, b) => (a.name < b.name ? 1 : -1));
      }
    }
    setFilteredEmployees(result);
  };

  React.useEffect(() => {
    sortEmployees(
      roleList,
      isArchived,
      employees,
      sortListByBirth,
      sortListByName
    );
  }, [roleList, isArchived, sortListByBirth, employees, sortListByName]);

  const checkboxSwitcher = () => {
    setIsArchived(!isArchived);
  };

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

  const [editContactId, setEditContactId] = React.useState(null);
  const [editEmployeeData, setEditEmployeeData] = React.useState({
    name: "",
    role: "",
    phone: "",
    birthday: "",
    isArchive: false,
  });

  const editEmployeeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target.value;
    setEditEmployeeData({ ...editEmployeeData, [name]: value });
  };

  const editEmployeeSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: editContactId,
      name: editEmployeeData.name,
      role: editEmployeeData.role,
      phone: editEmployeeData.phone,
      birthday: editEmployeeData.birthday,
      isArchive: false,
    };

    const editEmployee = [...filteredEmployees];
    const index = filteredEmployees.findIndex(
      (data) => data.id === editContactId
    );
    editEmployee[index] = payload;
    setFilteredEmployees(editEmployee);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const values = {
      name: contact.name,
      role: contact.role,
      phone: contact.phone,
      birthday: contact.birthday,
    };

    setEditEmployeeData(values);
  };

  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="container">
      <Header />
      <FilterCheckbox
        checkboxSwitcher={checkboxSwitcher}
        archived={isArchived}
      />

      <form onSubmit={editEmployeeSubmit}>
        <Modal
          show={show}
          onClose={handleClose}
          filteredEmployees={filteredEmployees}
          setFilteredEmployees={setFilteredEmployees}
          employees={employees}
          editEmployeeHandler={editEmployeeHandler}
        />
        <table>
          <thead>
            <tr>
              <th onClick={() => sortedByName()}>Имя</th>
              <th onClick={() => sortedByBirth()}>Дата рождения</th>
              <th>
                <label className="role-container">
                  Должность
                  <select onChange={(e) => setRoleList(e.target.value)}>
                    <option value="none"></option>
                    <option value="cook">Cook</option>
                    <option value="waiter">Waiter</option>
                    <option value="driver">Driver</option>
                  </select>
                </label>
              </th>
              <th>Телефон</th>
              <th>Изменить данные</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((item) => {
              return (
                <tr key={item.id}>
                  <td className={item.name}>{item.name}</td>
                  <td className={item.birthday}>{item.birthday}</td>
                  <td className={item.role}>{item.role}</td>
                  <td className={item.phone}>{item.phone}</td>
                  <td>
                    <EditIcon className="edit-button" onClick={handleShow} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>

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

const mapStateToProps = (state) => {
  const { employees } = state;
  return { employees };
};
export default connect(mapStateToProps)(App);
