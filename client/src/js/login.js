// css
import "../css/login.css";

export const loginFunction = () => {
  // getting the url parameters
  var url_string = window.location.href;
  var url = new URL(url_string);
  var error = url.searchParams.get("error");

  // if there is an error in log in due to incorrect pass or username, we show the error message
  if (error) {
    document.querySelector("#error").style = "";
  }
};
