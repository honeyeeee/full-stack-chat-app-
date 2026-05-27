const mongoose = require("mongoose");

const connect = async () => {
    try {
        await mongoose.connect("mongodb://database:27017/chat");

        console.log("connected to db");
    } catch (err) {
        console.log(err);

        setTimeout(connect, 5000);
    }
};

module.exports = connect;