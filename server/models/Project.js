const mongoose = require('mongoose')


const ProjectSchema = new mongoose.Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    status:{
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed']
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    frontendDeveloperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developers'
    },
    backendDeveloperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developers'
    },
    designDeveloperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developers'
    }
})

module.exports = mongoose.model('Project',ProjectSchema)