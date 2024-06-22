import { set, connect } from "mongoose";
import { UserModel } from "../models/user.model.js";
import { FoodModel } from "../models/food.model.js";
import { sample_foods, sample_users } from "../data.js";
import bcrypt from 'bcryptjs';

const PASSWORD_HASH_SALT_ROUNDS = 10;

set('strictQuery', true);

export const dbConnect = async () => {
    try {
        await connect(process.env.MONGO_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        await seedUsers();
        await seedFoods();
        console.log('DB Connected Successfully...');
    } catch (error) {
        console.log('DB Connection Failed:', error);
    }
}

async function seedUsers() {
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
        console.log("Users already seeded");
        return;
    }
    for (let user of sample_users) {
        user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
        await UserModel.create(user);
    }
    console.log('Users seed is done');
}

async function seedFoods() {
    const foodCount = await FoodModel.countDocuments();
    if (foodCount > 0) {
        console.log("Foods already seeded");
        return;
    }
    for (let food of sample_foods) {
        food.imageUrl = `/foods/${food.imageUrl}`
        await FoodModel.create(food);
    }
    console.log('Foods seed is done');
}