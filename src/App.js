import "./App.css";
import React from "react";
import FilterCheckbox from "./components/FilterCheckbox/FilterCheckbox";
import { connect } from "react-redux";
import Header from "./components/Header/Header";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "./components/Modal/Modal";
import AddEmployeeForm from "./components/AddEmployeeForm/AddEmployeeForm";
import { sortEmployees } from "./utils/filters";

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

  React.useEffect(() => {
    const filteredEmployees = sortEmployees(
      roleList,
      isArchived,
      employees,
      sortListByBirth,
      sortListByName
    );
    setFilteredEmployees(filteredEmployees);
  }, [roleList, isArchived, sortListByBirth, employees, sortListByName]);

  const checkboxSwitcher = () => {
    setIsArchived(!isArchived);
  };

  const [show, setShow] = React.useState(false);
  const [editEmployee, setEditEmployee] = React.useState({});

  const handleShow = (evt) => {
    const worker = filteredEmployees.find(
      (worker) => worker.id === evt.target.id
    );

    setEditEmployee(worker);
    setShow(true);
  };
  const handleClose = () => {
    setEditEmployee({});
    setShow(false);
  };

  return (
    <div className="container">
      <Header />
      <FilterCheckbox
        checkboxSwitcher={checkboxSwitcher}
        archived={isArchived}
      />
      <Modal
        show={show}
        onClose={handleClose}
        filteredEmployees={filteredEmployees}
        setFilteredEmployees={setFilteredEmployees}
        employeeData={editEmployee}
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
          {filteredEmployees.map((employee) => {
            return (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.birthday}</td>
                <td>{employee.role}</td>
                <td>{employee.phone}</td>
                <td>
                  <button
                    id={employee.id}
                    className="edit-button"
                    onClick={handleShow}
                  >
                    <EditIcon className="edit-icon" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <AddEmployeeForm />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { employees } = state;
  return { employees };
};
export default connect(mapStateToProps)(App);
