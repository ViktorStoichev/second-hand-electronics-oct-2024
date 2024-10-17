import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { jwt } from "../lib/jwt.js";


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

        return this.generateToken(newUser);
    },
    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid user or password!');
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw new Error('Invalid user or password!');
        }

        return this.generateToken(user);
    },
    async generateToken(user) {
        const payload = {
            _id: user._id,
            email: user.email,
            username: user.username
        };

        const header = { expiresIn: '2h' };
        const token = await jwt.sign(payload, process.env.JWT_SECRET, header);

        return token;
    }
};

export default authService;