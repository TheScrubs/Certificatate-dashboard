let coursesButton = document.querySelector("#courses");

// **post to route courses/getUdemyCourses  or  courses/getCourseraCourses
coursesButton.addEventListener("click", (e) => {
  axios
    .post("courses/getCourseraCourses", "gg")
    .then((res) => {
      console.log(res.data);
      alert("Check console.");
    })
    .catch((err) => {
      console.log(err);
      alert("Failed to fetch results.");
    });
});
