const HASH_HEADER = 'x-hub-signature';
const crypto = require('crypto');
const REPOS = require('config').get('repos');

class SecurityController {
  static check(req, res, next) {
    const signature = req.headers[HASH_HEADER];
    if (!signature) {
      return res.status(401).json();
    }

    const {repoName} = res.locals.requestParams;
    const entry = REPOS.find(it => it.name === repoName);
    if (!entry || !entry.secret) {
      console.error(`No security config for repo ${repoName}`);
      return res.status(403).json();
    }

    const hash = crypto.createHmac("sha1", entry.secret)
      .update(JSON.stringify(req.body))
      .digest("hex");
    const computedSignature = `sha1=${hash}`;

    if (crypto.timingSafeEqual(
        Buffer.from(signature), Buffer.from(computedSignature))) {
      next();
    } else {
      res.status(403).json();
    }
  }
}

module.exports = SecurityController;