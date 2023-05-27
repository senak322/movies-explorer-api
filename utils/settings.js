const { DB_ADDRESS, NODE_ENV } = process.env;

const dbAddress = NODE_ENV === 'production' ? DB_ADDRESS : 'mongodb://127.0.0.1:27017/filmsdb';

module.exports = { dbAddress };
