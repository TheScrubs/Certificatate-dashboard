import { isomorphicRouter } from "./universalRouter.js"; // isomorphic router
import { CourseList, Course } from "./certificates.js";
import { getCourses } from "./backendFunctions";

import { loginFunction } from "./login.js";
import { registerFunction } from "./register.js";

// Load css
import "../css/default.css";
import "../css/mainBody.css";
import "../css/sidebar.css";

// mainpage function
const mainPageFunction = () => {
  let coursesButton = document.querySelector("#courses");
  let courses = new CourseList();

  coursesButton.addEventListener("click", async function (e) {
    let allCourses = await getCourses();
    for (let [key, value] of Object.entries(allCourses)) {
      let course = new Course(
        value.course_id,
        value.course_title,
        value.num_lectures,
        value.num_reviews,
        value.num_subscribers,
        value.price,
        value.subject,
        value.level
      );
      courses.addCourse(course);
    }
  });
};

// frontend SPA routing function
async function render() {
  const page = await isomorphicRouter.resolve(location.pathname);
  if (page.redirect) {
    window.location = page.redirect;
  } else {
    document.body.innerHTML = page.content;
    if (window.location.pathname === "/") {
      mainPageFunction();
    } else if (window.location.pathname === "/login") {
      loginFunction();
    } else if (window.location.pathname === "/register") {
      registerFunction();
    }
  }
}

render(); // run client-side application
