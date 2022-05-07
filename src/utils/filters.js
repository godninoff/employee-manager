import moment from "moment";

export const sortEmployees = (
  roleList,
  isArchived,
  employees,
  birthday,
  name
) => {
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
  return result;
};
