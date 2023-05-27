class BusyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BusyError';
    this.statusCode = 409;
  }
}

module.exports = { BusyError };
