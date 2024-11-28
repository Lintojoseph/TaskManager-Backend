const mongoose = require("mongoose");
import User from "../src/modules/user/models/User";
const Configs = require("../src/configs/configs");
const bycrypt = require("bcryptjs");

console.log(User,'mongouser')
console.log('Configs object:', Configs);
console.log(Configs.default.mongohost,'mongooolo')
console.log('Environment MONGO_HOST:', process.env.MONGO_HOST);
const run = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(Configs.default.mongohost || 'mongodb://localhost:27017/Taskmanager');
        console.log("MongoDB connection successful.");
        await seedAdminUser();
        console.log("Admin seeding completed.");
    } catch (error) {
        console.error("Error in run function:", error);
    }
};

const seedAdminUser = async () => {
    try {
        console.log("Seeding admin user...");
        const password = await bycrypt.hash("admin@123", 10);
        const admin = {
            name: "admin",
            mobileNo: "9999999998",
            password,
            isSuperAdmin: true,
            isActive: true,
        };

       
      

        const result = await User.create(admin);
        console.log("Admin user created:", result);
    } catch (error) {
        console.error("Error in seedAdminUser:", error);
    }
};


run();




