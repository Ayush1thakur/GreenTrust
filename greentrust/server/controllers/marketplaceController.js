const RenewableSource = require('../models/RenewableSource');
const User = require('../models/User');

// Fetch all sources for sale
exports.getAllSources = async (req, res) => {
  try {
    const sources = await RenewableSource.find({ forSale: true }).populate('owner', 'name');
    const formatted = sources.map((source, index) => ({
      ...source.toObject(),
      ownerName: source.owner.name,
      ownerId: source.owner._id,
      sourceIndex: index,
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sources" });
  }
};

// List a source for sale
exports.sellSource = async (req, res) => {
  const { location, capacity, output, price } = req.body;
  const userId = req.userId;

  try {
    const newSource = new RenewableSource({
      location,
      capacity,
      output,
      price,
      owner: userId,
      forSale: true
    });

    await newSource.save();
    res.json({ message: "Source listed for sale" });
  } catch (err) {
    res.status(500).json({ error: "Failed to list source" });
  }
};

// Buy a source
exports.buySource = async (req, res) => {
  const { sourceId } = req.body;

  try {
    const source = await RenewableSource.findById(sourceId);
    if (!source || !source.forSale) return res.status(404).json({ error: "Source not available" });

    source.forSale = false;
    await source.save();

    res.json({ message: "Purchase successful" });
  } catch (err) {
    res.status(500).json({ error: "Purchase failed" });
  }
};
