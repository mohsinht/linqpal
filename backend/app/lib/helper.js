const crypto = require('crypto');

// Must be used in an environment variable or a file that is not pushed on a public repo for more safety.
exports.secret = process.env.SECRET_KEY || require('../../config/secret_key').key || `869D72F7F7478C1BE7A7B158A3E79`;
exports.iv = process.env.SECRET_IV || require('../../config/secret_key').iv || `6A5ECFF8D5F8A`;

exports.encrypt = (text) => {
    return crypto.createHmac('sha256', this.secret)
                   .update(text)
                   .digest('hex');
};