import mongoose from 'mongoose';
import userModel from './UserModule.js';

const dbUrl = "mongodb://localhost:27017/rajTest";

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
    Mutation:{
        addUser:async(parent,args)=>{
            connect()
            let user=new userModel({
                name:args.name,
                email:args.email,
                mobile:args.mobile
            })
            const result=user.save().then((res)=>{
                if (res){
                    return res;
                }
            })
            return result
        }
    }

};
