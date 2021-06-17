import axios from "axios";
import UniversalRouter from "universal-router";

const routes = [
  {
    path: "/",
    async action() {
      let authenticateStatus;

      try {
        const authenticate = await axios.get("/auth/check");
        authenticateStatus = authenticate.data;
      } catch {
        authenticateStatus = false;
      }

      if (authenticateStatus) {
        return fetch("/")
          .then((res) => {
            return res.text();
          })
          .then(function (html) {
            // Initialize the DOM parser
            var parser = new DOMParser();
            // Parse the text
            var doc = parser.parseFromString(html, "text/html");

            return { content: doc.body.innerHTML };
          })
          .catch(function (err) {
            console.log("Failed to fetch page: ", err);
          });
      } else {
        return { redirect: "/login" };
      }
    },
  },
  {
    path: "/login",
    async action() {
      let authenticateStatus;
      try {
        const authenticate = await axios.get("/auth/check");
        authenticateStatus = authenticate.data;
      } catch {
        authenticateStatus = false;
      }
      if (!authenticateStatus) {
        return fetch("/login")
          .then((res) => {
            return res.text();
          })
          .then(function (html) {
            // Initialize the DOM parser
            var parser = new DOMParser();

            // Parse the text
            var doc = parser.parseFromString(html, "text/html");
            return { content: doc.body.innerHTML };
          })
          .catch(function (err) {
            console.log("Failed to fetch page: ", err);
          });
      } else {
        return { redirect: "/" };
      }
    },
  },
  {
    path: "/register",
    action() {
      return axios
        .get("http://localhost:8080/register")
        .then((res) => {
          return { content: res.data };
        })
        .catch(function (err) {
          console.log("Failed to fetch page: ", err);
        });
    },
  },
];

export default new UniversalRouter(routes);
