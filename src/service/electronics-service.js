import Electronics from "../models/Electronics.js"


const electronicsService = {
    create(data, userId) {
        return Electronics.create({ ...data, owner: userId });
    },
    getAll() {
        return Electronics.find();
    },
    getOne(deviceId) {
        return Electronics.findById(deviceId);
    }
}

export default electronicsService;