import axios from "axios";
import UniversalRouter from "universal-router";

const domain = "http://localhost:8080";

const routes = [
  {
    path: "/",
    async action() {
      let authenticateStatus;

      try {
        const authenticate = await axios.get(`${domain}/auth/check`);
        authenticateStatus = authenticate.data;
      } catch {
        authenticateStatus = false;
      }

      if (authenticateStatus) {
        return axios
          .get(`${domain}/`)
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
        const authenticate = await axios.get(`${domain}/auth/check`);
        authenticateStatus = authenticate.data;
      } catch {
        authenticateStatus = false;
      }
      if (!authenticateStatus) {
        return axios
          .get(`${domain}/login`)
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
        .get(`${domain}/register`)
        .then((res) => {
          return { content: res.data };
        })
        .catch(function (err) {
          console.log("Failed to fetch page: ", err);
        });
    },
  },
  {
    // Error 404 *Shld be kept as the last route
    path: "(.*)",
    action() {
      return axios
        .get(`${domain}/Error404`)
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
