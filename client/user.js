const mongoose = require('mongoose');

mongoose.connect('your_mongodb_connection_string', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error(err);
});
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    
bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) {
        return next(err);
    }

    this.password = passwordHash;
    next();
});
});

UserSchema.methods.comparePassword = function(password, cb) {
bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
        return cb(err);
    } else {
        if (!isMatch) {
            return cb(null, isMatch);
        }
        return cb(null, this);
    }
});
};

module.exports = mongoose.model('User', UserSchema);