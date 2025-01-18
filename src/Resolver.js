import mongoose from "mongoose";
import { dbUrl } from "../config/db.js";
import userModel from './UserModule.js';


const connect = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export const resolvers = {
  Query: {
    getUserList: async () => {
      connect();
      try {
        const result = await userModel.find({});
        return result;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Error fetching users.");
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
     await connect();
      let user = new userModel({
        name: args.name,
        email: args.email,
        mobile: args.mobile,
      });
      const result = user
        .save()
        .then((res) => {
          if (res) {
            return res;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      return result;
    },
    updateUser: async (parent, args) => {
    await  connect();
      const result = userModel
        .findByIdAndUpdate(args.id, {
          name: args.name,
          email: args.email,
          mobile: args.mobile,
        })
        .then((res) => {
          if (res) {
            return res;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      return result;
    },
  },
};
