class RequestParams {
  /**
   * @param {string} event
   * @param {string} action
   * @param {string} repoName
   */
  constructor(event, action, repoName) {
    this.event = event;
    this.action = action;
    this.repoName = repoName;
  }
}

module.exports = RequestParams;