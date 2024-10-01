const express = require("express");
const {
  home,
  ph,
  movies,
  addMovie,
  saveMovie,
  deletMovie,
  editMovie,
  updateMovie,
} = require("./controllers");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // menangkap req.body

app.get("/", home);
app.get("/production-houses", ph);
app.get("/movies", movies);
app.get("/movies/add", addMovie);
app.post("/movies/add", saveMovie);
app.get("/movies/edit/:id", editMovie);
app.post("/movies/edit/:id", updateMovie);
app.get("/movies/delete/:id", deletMovie);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
