const mongoose = require("mongoose"),
  config = require("../config/database");

const RestaurantSchema = mongoose.Schema();

const Restaurant = (module.exports = mongoose.model(
  "Restaurant",
  RestaurantSchema,
  "restaurants"
));

module.exports.findRestaurants = (query, callback) => {
  const fields = {
    _id: 0,
    has_table_booking: 0,
    has_online_delivery: 0,
    rating_text: 0
  };
  const sort = {};
  if (query.sort_rating) sort.aggregate_rating = query.sort_rating;
  if (query.sort_votes) sort.votes = query.sort_votes;
  if (query.sort_avg_cost) sort.average_cost_for_two = query.sort_avg_cost;
  Restaurant.find(
    null,
    fields,
    { skip: query.page * 20, sort, limit: 20 },
    callback
  );
};

module.exports.findRestaurantById = (restaurant_id, callback) => {
  Restaurant.findOne({ restaurant_id }, callback);
};

module.exports.getRestaurantsCount = callback => {
  Restaurant.countDocuments(null, callback);
};
