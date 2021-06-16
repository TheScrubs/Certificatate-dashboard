import { mainPageFunction } from "./route.js";
import "./certificates.js"

// Load css
import "../css/default.css";
import "../css/mainBody.css";
import "../css/sidebar.css";

let coursesButton = document.querySelector("#courses");

coursesButton.addEventListener("click", (e) => {
    mainPageFunction().then(data => {
        console.log('reached this endpoint')
        alert('finished the mainpage function');
    })
})


