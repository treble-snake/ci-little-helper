module.exports = {
  stopWord: '/no-deploy',
  branches: ['develop'],
  // just for merging for now
  repos: [
    {
      name: 'repo-name',
      script: '/dir/someScript.sh',
      secret: ''
    }
  ]
};