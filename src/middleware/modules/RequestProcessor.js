const RequestParser = require('../../helpers/RequestParser');

class RequestProcessor {
  static parseCommon(req, res, next) {
    res.locals.requestParams = RequestParser.parseCommon(req);
    next();
  }
}

module.exports = RequestProcessor;