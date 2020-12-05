const crypto = require('crypto');

// Must be used in an environment variable or a file that is not pushed on a public repo for more safety.
exports.secret = process.env.SECRET_KEY || require('../../config/secret_key') || `869D72F7F7478C1BE7A7B158A3E79`;

exports.encrypt = (text) => {
    return crypto.createHmac('sha256', this.secret)
                   .update(text)
                   .digest('hex');
};