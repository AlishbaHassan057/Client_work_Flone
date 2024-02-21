const mongoose = require('mongoose');


const connect = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Your Database has been connected on Host: ${mongoose.connection.host.cyan}`)
}

module.exports = connect
