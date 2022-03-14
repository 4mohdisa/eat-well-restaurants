const express = require("express");
const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");

const app = express();

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

app.use(express.static(path.join("public")));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  //   const htmlFilePath = path.join(__dirname, "view", "index.html");

  res.render("index");

  //   res.sendFile(htmlFilePath);
});
app.get("/about", (req, res) => {
  //   const htmlFilePath = path.join(__dirname, "view", "about.html");

  //   res.sendFile(htmlFilePath);

  res.render("about");
});
app.get("/confirm", (req, res) => {
  //   const htmlFilePath = path.join(__dirname, "view", "confirm.html");

  //   res.sendFile(htmlFilePath);

  res.render("confirm");
});
app.get("/recommend", (req, res) => {
  //   const htmlFilePath = path.join(__dirname, "view", "recommend.html");
  //   res.sendFile(htmlFilePath);
  res.render("recommend");
});

app.post("/recommend", (req, res) => {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  res.redirect("/confirm");
});

app.get("/restaurants", (req, res) => {
  //   const htmlFilePath = path.join(__dirname, "view", "restaurants.html");

  //   res.sendFile(htmlFilePath);
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});
const PORT = process.env.PORT || config.httpPort;
app.listen(PORT);
