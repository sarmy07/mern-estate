const Listing = require("../models/Listing");

const createListing = async (req, res) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    return res.status(200).json(listing);
  } catch (error) {
    res.status(500).json("Error creating listing", error);
    console.log(error);
  }
};

module.exports = { createListing };
