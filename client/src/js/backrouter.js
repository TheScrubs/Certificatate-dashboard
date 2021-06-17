const axios = require("axios");
const UniversalRouter = require("universal-router");

const routes = [
  // {
  //   path: "/",
  //   async action() {
  //     const authenticate = await axios.get("/auth/check");
  //     const authenticateStatus = authenticate.data;
  //     if (authenticateStatus) {
  //       return fetch("/")
  //         .then((res) => {
  //           return res.text();
  //         })
  //         .then(function (html) {
  //           // Initialize the DOM parser
  //           var parser = new DOMParser();
  //           // Parse the text
  //           var doc = parser.parseFromString(html, "text/html");

  //           return { content: doc.body.innerHTML };
  //         })
  //         .catch(function (err) {
  //           console.log("Failed to fetch page: ", err);
  //         });
  //     } else {
  //       return { redirect: "/login" };
  //     }
  //   },
  // },
  // {
  //   path: "/login",
  //   async action() {
  //     const authenticate = await axios.get("/auth/check");
  //     const authenticateStatus = authenticate.data;
  //     if (!authenticateStatus) {
  //       return fetch("/login")
  //         .then((res) => {
  //           return res.text();
  //         })
  //         .then(function (html) {
  //           // Initialize the DOM parser
  //           var parser = new DOMParser();

  //           // Parse the text
  //           var doc = parser.parseFromString(html, "text/html");
  //           return { content: doc.body.innerHTML };
  //         })
  //         .catch(function (err) {
  //           console.log("Failed to fetch page: ", err);
  //         });
  //     } else {
  //       return { redirect: "/" };
  //     }
  //   },
  // },
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

const isomorphicRouter = new UniversalRouter(routes);

module.exports = isomorphicRouter;

// router.resolve("/").then((page) => {
//   if (page.redirect) {
//     const state = { from: page.from };
//     window.history.pushState(state, "", page.redirect);
//   } else {
//     document.body.innerHTML = page.content;
//   }
// });

// router.resolve("/login").then((page) => {
//   if (page.redirect) {
//     const state = { from: page.from };
//     window.history.pushState(state, "", page.redirect);
//   } else {
//     document.body.innerHTML = page.content;
//   }
// });

// router.resolve("/register").then((page) => {
//   document.body.innerHTML = page.content;
// });
