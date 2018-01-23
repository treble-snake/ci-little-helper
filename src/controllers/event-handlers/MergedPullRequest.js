const {exec} = require('child_process');
const config = require('config');
const RequestParser = require('../../helpers/RequestParser');

const STOP_WORD = config.get('stopWord');
const REQUIRED_BRANCHES = config.get('branches');
const REPOS = config.get('repos');

const REPOS_NAMES = REPOS.map(it => it.name);
const REQUIRED_ACTION = 'closed';

module.exports = (req, res, next) => {
  const {action, repoName} = res.locals.requestParams;
  const prParams = RequestParser.parsePullRequest(req);
  const {description, targetBranch, isMerged} = prParams;

  console.log('\nGot request ', new Date());
  console.log('Request Params:', res.locals.requestParams);

  if (!isMerged || action !== REQUIRED_ACTION ||
    !REQUIRED_BRANCHES.includes(targetBranch) || !REPOS_NAMES.includes(repoName) ||
    description.includes(STOP_WORD)) {
    console.log('No action');
    return res.json({result: 'no-action'});
  }

  const entry = REPOS.find(it => it.name === repoName);
  if (!entry) {
    console.log('No script');
    return res.status(400).json({result: 'script-not-found'});
  }

  console.log('Running script: ', entry.script);

  exec(`sh ${entry.script}`, (error, stdout, stderr) => {
    console.log(`Stdout results: ${stdout}`);
    console.log(`Stderr results: ${stderr}`);
    if (error !== null) {
      console.error(`Exec error: ${error}`);
      res.status(500).json({result: 'script-run-error'});
    } else {
      res.json({result: 'script-run-success'});
    }
  });
};