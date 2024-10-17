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
    },
    buy(deviceId, userId) {
        return Electronics.findByIdAndUpdate(deviceId, { $push: { buyingList: userId } });
    }
}

export default electronicsService;