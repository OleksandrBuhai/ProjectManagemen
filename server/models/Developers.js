const mongoose = require('mongoose');

const DeveloperSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    position: {
        type: String,
        enum: ['Front End', 'Back End', 'UI/UX Design'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
});

module.exports = mongoose.model('Developers', DeveloperSchema);
