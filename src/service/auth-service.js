import User from "../models/User.js";


const authService = {
    async register(email, username, password, rePassword) {
        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (user) {
            throw new Error('User already exists!');
        }

        if (password !== rePassword) {
            throw new Error('Password\'s don\'t match!');
        }

        const newUser = await User.create({ username, email, password });

        return newUser;
    },
};

export default authService;