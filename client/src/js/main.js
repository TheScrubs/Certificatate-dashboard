import axios from "axios";
import Navigo from "navigo";

// Load css
import "../css/default.css";
import "../css/mainBody.css";
import "../css/sidebar.css";

const router = new Navigo("/");

router.on("/auth/login", function () {
  if (window.location.pathname !== "/login.html") {
    window.location.replace("/login.html");
  }
});

axios
  .get("/auth/check")
  .then((res) => {
    if (!res.data) {
      router.navigate("/auth/login");
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
    alert("Server error. PLease try again.");
  });
