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

  fetch("/")
    .then((res) => {
      return res.text();
    })
    .then(function (html) {
      // Initialize the DOM parser
      var parser = new DOMParser();

      // Parse the text
      var doc = parser.parseFromString(html, "text/html");
      document.body.innerHTML = doc.body.innerHTML;
    })
    .catch(function (err) {
      console.log("Failed to fetch page: ", err);
    });
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

  fetch("/login")
    .then((res) => {
      return res.text();
    })
    .then(function (html) {
      // Initialize the DOM parser
      var parser = new DOMParser();

      // Parse the text
      var doc = parser.parseFromString(html, "text/html");
      document.body.innerHTML = doc.body.innerHTML;
    })
    .catch(function (err) {
      console.log("Failed to fetch page: ", err);
    });
};

router.on({
  "/login": loginPageFunction,
  "/login/:error": function () {},
  "/register": function () {
    fetch("/register")
      .then((res) => {
        return res.text();
      })
      .then(function (html) {
        // Initialize the DOM parser
        var parser = new DOMParser();

        // Parse the text
        var doc = parser.parseFromString(html, "text/html");
        document.body.innerHTML = doc.body.innerHTML;
      })
      .catch(function (err) {
        console.log("Failed to fetch page: ", err);
      });
  },
  "/": mainPageFunction,
});

router.notFound(function (query) {
  if (window.location.pathname !== "/Error404") {
    window.location.href = "/Error404";
  }
});

router.resolve();
