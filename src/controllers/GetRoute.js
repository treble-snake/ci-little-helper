const EVENTS = {
  ping: 'ping',
  pullRequest: 'pull_request'
};

const ROUTES = {
  [EVENTS.ping]: require('./event-handlers/Ping'),
  [EVENTS.pullRequest]: require('./event-handlers/MergedPullRequest')
};

module.exports = (req, res, next) => {
  const {requestParams: {event}} = res.locals;

  if (!event || !Object.values(EVENTS).includes(event) ||
    !Object.keys(ROUTES).includes(event)) {
    return res.status(400).json({message: `Unknown event '${event}'`});
  }

  ROUTES[event](req, res, next);
};