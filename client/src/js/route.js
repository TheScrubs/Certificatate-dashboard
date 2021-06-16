import axios from "axios";
import Navigo from "navigo";

export const router = new Navigo("/");

const mainPageFunction = () => {
  axios
    .get("/auth/check")
    .then((res) => {
      if (!res.data) {
        router.navigate("/login");
      } else {
        let coursesButton = document.querySelector("#courses");

        // **post to route courses/getUdemyCourses  or  courses/getCourseraCourses
        coursesButton.addEventListener("click", (e) => {
          axios
            .get("/courses/getUdemyCourses")
            .then((res) => {
              console.log(res.data);
              alert("Check console.");
            })
            .catch((err) => {
              console.log("did not send request to Udemy courses");
              console.log(err);
              alert("Failed to fetch results.");
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      router.navigate("/login");
      alert("Server error. Please try again.");
    });

  if (window.location.pathname !== "/") {
    window.location.href = "/";
  }
};
const loginPageFunction = () => {
  axios
    .get("/auth/check")
    .then((res) => {
      if (res.data) {
        router.navigate("/");
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Server error. Please try again.");
    });

  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

router.on({
  "/login": loginPageFunction,
  "/login/:error": function () {},
  "/register": function () {
    if (window.location.pathname !== "/register") {
      window.location.href = "/register";
    }
  },
  "/": mainPageFunction,
});

router.notFound(function (query) {
  if (window.location.pathname !== "/Error404") {
    window.location.href = "/Error404";
  }
});

router.resolve();
