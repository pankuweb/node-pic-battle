const User = require("./../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");

// -----------------
// -----------------
//Route handdlers
// --------------------

// Get all users ----
// -----------------------
exports.getAllUsers = catchAsync(async (req, res) => {
  // const io = req.app.get("io");

  // const users = await User.find().sort({ $natural: -1 });
  // io.emit("user-list", users);
  const totalUsers = await User.find();

  let { page, limit, sort, asc } = req.query;
  if (!page) page = 1;
  if (!limit) limit = 10;

  const skip = (page - 1) * 10;
  const users = await User.find().skip(skip).limit(limit);

  res.status(200).json({
    message: "success",
    message: "Users fetched successfully!",
    results: users.length,
    page: Number(page),
    limit: Number(limit),
    data: {
      pagination_info: {
        total_elements: totalUsers.length,
        page_size: Number(limit),
      },
      users: users,
    },
  });
});

// Create new user ----
// -----------------------
exports.createUser = catchAsync(async (req, res) => {
  const users = await User.create(req.body);

  res.status(201).json({
    status: "success",
    message: "created successfully!",
    data: {
      users,
    },
  });
});

// Update user ----
// -----------------------
exports.updateUser = catchAsync(async (req, res, next) => {
  //Validate Data

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "updated successfully",
    data: {
      user,
    },
  });
});

// Delete user ----
// -----------------------
exports.deleteUser = catchAsync(async (req, res, next) => {
  const users = await User.findByIdAndDelete(req.params.id);

  if (!users) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      message: "user deleted successfully!",
    },
  });
});

// Get user by id ----
// -----------------------
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  // user.purched_memberships.sort(function (a, b) {
  //   return new Date(b.expired) - new Date(a.expired);
  // });

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "fetched successfully!",
    data: {
      user,
    },
  });
});

// Add Amount ----
// -----------------------
exports.addToken = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "updated successfully",
    data: {
      user,
    },
  });
});
