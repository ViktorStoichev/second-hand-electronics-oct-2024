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
    },
    remove(deviceId) {
        return Electronics.findByIdAndDelete(deviceId);
    },
    edit(deviceId, data) {
        return Electronics.findByIdAndUpdate(deviceId, data, { runValidators: true });
    }
}

export default electronicsService;