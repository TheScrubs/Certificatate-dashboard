const axios = require('axios')

// Load css
require('../css/default.css')
require('../css/mainBody.css')
require('../css/sidebar.css')

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
      console.log('did not send request to Udemy courses')
      console.log(err);
      alert("Failed to fetch results.");
    });
});
