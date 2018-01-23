const RequestParams = require('../model/RequestParams');
const PullRequestParams = require('../model/PullRequestParams');

const EVENT_HEADER = 'x-github-event';

class RequestParser {
  /**
   * @param req
   * @return {RequestParams}
   */
  static parseCommon(req) {
    const {
      action,
      repository: {name: repoName}
    } = req.body;

    return new RequestParams(req.headers[EVENT_HEADER], action, repoName);
  }

  /**
   * @param req
   * @return {PullRequestParams}
   */
  static parsePullRequest(req) {
    const {
      pull_request: {
        body: prDescription,
        merged: prMerged,
        base: {ref: targetBranch}
      }
    } = req.body;

    return new PullRequestParams(prDescription, prMerged, targetBranch);
  }
}

module.exports = RequestParser;