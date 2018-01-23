class PullRequestParams {
  /**
   * @param {string} description
   * @param {boolean} isMerged
   * @param {string} targetBranch
   */
  constructor(description, isMerged, targetBranch) {
    this.description = description;
    this.isMerged = isMerged;
    this.targetBranch = targetBranch;
  }
}

module.exports = PullRequestParams;