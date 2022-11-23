const catchAsync = require("../utils/catchAsync");
const Battle = require("../models/battleModel");
// const io = require("../server");

// -----------------
//Route handdlers
// -----------------

// Get all battles of enquiery
// -----------------------
exports.getAllBattle = catchAsync(async (req, res) => {
  const io = req.app.get("io");

  const battle = await Battle.find().sort({ $natural: -1 });
  io.emit("Battle-added", battle);

  res.status(200).json({
    message: "success",
    message: "Battle fetched successfully!",
    results: battle.length,

    data: {
      battle: battle,
    },
  });
});

// Create a enquiery Battle
// -----------------------
exports.createBattle = catchAsync(async (req, res, next) => {
  const io = req.app.get("io");

  const newBattle = await Battle.create(req.body);
  const battle = await Battle.find().sort({ $natural: -1 });

  io.emit("battle-added", battle);

  res.status(201).json({
    status: "success",
    message: "created successfully!",
    data: {
      Battle: newBattle,
    },
  });
});

// Create a enquiery Battle
// -----------------------
exports.updateBattle = catchAsync(async (req, res, next) => {
  const io = req.app.get("io");
  const battle = await Battle.findById(req.params.id);

  if (!battle) {
    return next(new AppError("Battle not found!", 400));
  }
  battle.user_a.like = req.body.user_a.like;
  battle.user_b.like = req.body.user_b.like;

  io.emit("battle-added", battle);
  await battle.save();

  res.status(201).json({
    status: "success",
    message: "created successfully!",
    data: {
      Battle: battle,
    },
  });
});

// Get user by id ----
// -----------------------
exports.getBattle = catchAsync(async (req, res, next) => {
  const battle = await Battle.findById(req.params.id);
  // battle.purched_memberships.sort(function (a, b) {
  //   return new Date(b.expired) - new Date(a.expired);
  // });

  if (!battle) {
    return next(new AppError("No battle found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "fetched successfully!",
    data: {
      battle,
    },
  });
});
