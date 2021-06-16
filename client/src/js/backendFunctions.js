import axios from 'axios'
import Navigo from "navigo";

export const router = new Navigo("/");

export function getCourses() {
    return axios
    .get("/courses/getUdemyCourses")
    .then((res) => {
    console.log(res.data);
    // console.log('got the data')
    // alert("Check console.");
    console.log(res.data)
    return res.data
    })
    .catch((err) => {
    console.log("did not send request to Udemy courses");
    console.log(err);
    alert("Failed to fetch results.");
    });
}