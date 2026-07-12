const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./connect");
const Table = require("./models/table");
const User = require("./models/user");

connectDB();

const tables = [
  { number: 1, capacity: 4 },
  { number: 2, capacity: 2 },
  { number: 3, capacity: 6 },
  { number: 4, capacity: 4 },
  { number: 5, capacity: 2 },
];

const seed = async () => {
  await Table.deleteMany({});
  await Table.insertMany(tables);
  console.log("Tables seeded");

  const admin = await User.findOne({ email: "admin@example.com" });


  if (!admin) {
    const hashedPassword = await bcrypt.hash("admin123", 12);
    await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });
     console.log("Admin created");
  }

  mongoose.connection.close();
};

seed();
