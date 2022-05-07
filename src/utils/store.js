import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { nanoid } from "nanoid";
const addEmployeeId = (employee) => ({ ...employee, id: nanoid(6) });

function counterReducer(state = { employees: [] }, action) {
  switch (action.type) {
    case "addEmployees":
      return { employees: [...state.employees, addEmployeeId(action.payload)] };
    case "updateEmployees":
      return {
        employees: state.employees.map((employee) =>
          employee.id === action.updatedEmployee.id
            ? action.updatedEmployee
            : employee
        ),
      };

    default:
      return state;
  }
}
let store = createStore(counterReducer, applyMiddleware(logger));

export default store;
