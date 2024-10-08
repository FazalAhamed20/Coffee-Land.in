const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
require("dotenv").config();
const router = require("./routers/userrouter");
const router1 = require("./routers/adminrouter");
const cartCountMiddleware = require("./middlewares/cartCountMiddleware");
const morgan = require("morgan");

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(
  "/product-images",
  express.static(path.join(__dirname, "public/assets/product-images"))
);

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

app.use(flash());
app.use(passport.session());
app.use(cartCountMiddleware);

app.use("/", router);
app.use("/", router1);

app.use((req, res, next) => {
  res.status(404).render('./user/404.ejs');
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('./user/500.ejs');
});

const PORT = process.env.PORT || 9999 ;
app.listen(PORT, () => {
  console.log(`server is running on  ${PORT}`);
});
