const express = require("express");
const router = express.Router(),
  passport = require("passport"),
  config = require("../config/database");

const Restaurant = require("../models/Restaurant");

router.get("/", (req, res) => {
  Restaurant.findRestaurants(req.query, (err, restaurants) => {
    if (err) {
      res.status(404).json({ msg: "Restaurants not found" });
      throw err;
    }
    Restaurant.getRestaurantsCount((err, count) => {
      if (err) {
        res.status(404).json({ msg: "Restaurants not found" });
        throw err;
      }

      res.json({ total_count: count, restaurants });
    });
  });
});

router.get("/:id", (req, res) => {
  Restaurant.findRestaurantById(parseInt(req.params.id), (err, restaurant) => {
    if (err) {
      res.status(404).json({ msg: "Restaurant not found" });
      throw err;
    }

    res.json(restaurant);
  });
});

module.exports = router;
