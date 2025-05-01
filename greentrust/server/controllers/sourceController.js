const RenewableSource = require("../models/RenewableSource");

exports.addSource = async (req, res) => {
  try {
    const { location, capacity, output } = req.body;
    const source = await RenewableSource.create({
      user: req.user,
      location,
      capacity,
      output,
    });
    res.status(201).json(source);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
