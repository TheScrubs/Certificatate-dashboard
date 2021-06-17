import axios from "axios";
import UniversalRouter from "universal-router";

const routes = [
  {
    path: "/",
    async action() {
      let authenticateStatus;

      try {
        const authenticate = await axios.get(
          "http://localhost:8080/auth/check"
        );
        authenticateStatus = authenticate.data;
      } catch {
        authenticateStatus = false;
      }

      if (authenticateStatus) {
        return axios
          .get("http://localhost:8080/")
          .then((res) => {
            return { content: res.data };
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
        const authenticate = await axios.get(
          "http://localhost:8080/auth/check"
        );
        authenticateStatus = authenticate.data;
      } catch {
        authenticateStatus = false;
      }
      if (!authenticateStatus) {
        return axios
          .get("http://localhost:8080/login")
          .then((res) => {
            return { content: res.data };
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

export const isomorphicRouter = new UniversalRouter(routes);
