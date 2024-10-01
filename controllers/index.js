const Movie = require("../models/Movie");
const ProductionHouse = require("../models/ProductionHouse");

exports.home = (req, res) => {
  res.render("Home");
};

exports.ph = async (req, res) => {
  try {
    const ph = await ProductionHouse.findAll();
    res.render("ProductionHouses", { ph });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.movies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.render("Movies", { movies });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.addMovie = async (req, res) => {
  try {
    const ph = await ProductionHouse.findAll();
    res.render("AddMovie", { genres: Movie.genres, ph });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.saveMovie = async (req, res) => {
  try {
    await Movie.create(req.body);
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.deletMovie = async (req, res) => {
  try {
    await Movie.destroy(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.editMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const ph = await ProductionHouse.findAll();
    res.render("EditMovie", { genres: Movie.genres, ph, movie });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.updateMovie = async (req, res) => {
  try {
    await Movie.update(req.params.id, req.body);
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
