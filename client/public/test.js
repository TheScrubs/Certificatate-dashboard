let coursesButton = document.querySelector("#courses");

coursesButton.addEventListener("click", (e) => {
  axios
    .post("courses/getUdemyCourses", "gg")
    .then((res) => {
      console.log(res.data);
      alert("Got em!");
    })
    .catch((err) => {
      console.log(err);
      alert("I failed to get em :(");
    });
});
