#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"',
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
require("dotenv").config();

const User = require("./models/user");
const UserMessage = require("./models/userMessage");

const userHolder = [];
const userMessageHolder = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUser();
  await createUserMessage();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function userCreate(
  index,
  first_Name,
  last_Name,
  username,
  password,
  status,
) {
  const userDetail = {
    firstName: first_Name,
    lastName: last_Name,
    username: username,
    password: password,
    status: status,
  };

  if (status != false) userDetail.status = status;

  const user = new User(userDetail);
  await user.save();
  userHolder[index] = user;
  console.log(`Added User: ${username}`);
}

async function userCreateMessage(index, title, text, timeStamp, createdBy) {
  const userMessageDetail = {
    title: title,
    text: text,
    timeStamp: timeStamp,
    createdBy: createdBy,
  };
  const usermessage = new UserMessage(userMessageDetail);
  await usermessage.save();
  userMessageHolder[index] = usermessage;
  console.log(`Added User Message: ${title}`);
}

async function createUser() {
  console.log("Adding User");
  await userCreate(
    0,
    "Callistus",
    "Anizoba",
    "obinnaanizoba5@gmail.com",
    "Ob_Cz011",
    "None",
  );
}

async function createUserMessage() {
  console.log("Adding User Message");
  await userCreateMessage(
    0,
    "Members",
    "For All the Dogs",
    "11:16",
    userHolder[0],
  );
}
