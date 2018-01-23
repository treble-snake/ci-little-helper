class MiddlewareFactory {
  static checkSecurity() {
    return require('./modules/SecurityController').check;
  }

  static parseCommonRequest() {
    return require('./modules/RequestProcessor').parseCommon;
  }
}

module.exports = MiddlewareFactory;