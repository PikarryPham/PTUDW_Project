module.exports = {
  dividePercent(numb1, numb2) {
    return (parseInt(numb1) / parseInt(numb2)) * 100;
  },
  ifCondAdminInstructor(role) {
    return ["admin", "instructors"].includes(role);
  },
  ifCondUserInstructor(role) {
    return ["user", "instructors"].includes(role);
  },
  ifCondAdmin(role) {
    return ["admin"].includes(role);
  },
  ifCondInstructor(role) {
    return ["instructors"].includes(role);
  },
  isAddWishList(user, idCourse) {
    return (
      user && user.wishCourse.find(el => el.toString() === idCourse.toString())
    );
  },
  ifCondUser(role) {
    return ["user"].includes(role);
  },
  for(from, to, incr, data) {
    var accum = "";
    console.log(data);
    for (var i = from; i < to; i += incr) {
      accum += `${data}`;
    }
    return accum;
  },
  handlePagination(queryObj, numberPage) {
    if (queryObj.category) {
      return `?page=${numberPage}&category=${queryObj.category}`;
    } else if (queryObj.title && !queryObj.sort) {
      return `?page=${numberPage}&title=${queryObj.title}`;
    } else if (queryObj.title && queryObj.sort) {
      return `?page=${numberPage}&title=${queryObj.title}&sort=${queryObj.sort}`;
    }
    return `?page=${numberPage}`;
  },
  getPositiveNumbers(number) {
    const date = Date.parse(number);
    if (new Date() - (date + 1000 * 60 * 60 * 12) > 0) {
      return false;
    }
    return true;
  },
  increaseIndexByOne(index) {
    return 1 + index ;
  },
  getDataIdByIndex(index) {
    return 672 + index
  },
  
};
