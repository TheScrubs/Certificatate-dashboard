import axios from "axios";

export function getCourses() {
  return axios
    .get("/courses/getUdemyCourses")
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("did not send request to Udemy courses");
      console.log(err);
      alert("Failed to fetch results.");
    });
}
