const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

//config dot env
require("dotenv").config();

// Initialise express app
const app = express();

// Body Parser Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

const LINKEDIN_KEY = process.env.CLIENT_ID;
const LINKEDIN_SECRET = process.env.CLIENT_SECERT;
const SESSION_SECRET = process.env.SESSION_SECRET;

// passport authentication
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// app.use(session({ secret: SESSION_SECRET }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
//   new LinkedInStrategy(
//     {
//       clientID: LINKEDIN_KEY,
//       clientSecret: LINKEDIN_SECRET,
//       callbackURL: "http://127.0.0.1:3003/auth/linkedin/callback",
//       scope: ["r_emailaddress", "r_liteprofile"],
//     },
//     (accessToken, refreshToken, profile, done) => {
//       process.nextTick(() => {
//         return done(null, profile);
//       });
//     }
//   )
// );

// app.get(
//   "/auth/linkedin",
//   passport.authenticate("linkedin", { state: "some state" })
// );

// app.get(
//   "/auth/linkedin/callback",
//   passport.authenticate("linkedin", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// );

// app.get("/", (req, res) => {
//   if (req.user) {
//     console.log(req.user);
//     const name = req.user.name.givenName;
//     const family = req.user.name.familyName;
//     const photo = req.user.photos[0].value;
//     const email = req.user.emails[0].value;
//     res.send(
//       `<center style="font-size:140%"> <p>User is Logged In </p>
//         <p>Name: ${name} ${family} </p>
//         <p> Linkedn Email: ${email} </p>
//         <img src="${photo}"/>
//         </center>
//         `
//     );
//   } else {
//     res.send(`<center style="font-size:160%"> <p>This is Home Page </p>
//       <p>User is not Logged In</p>
//       <img style="cursor:pointer;"  onclick="window.location='/auth/linkedIn'" src="http://www.bkpandey.com/wp-content/uploads/2017/09/linkedinlogin.png"/>
//       </center>
//       `);
//   }
// });

//set static folder
app.use(express.static(path.join(__dirname, "../", "client", "public")));

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
