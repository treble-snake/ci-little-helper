# CI Little Helper

Helps organizing the most simple CI via Git Hooks by running given bash scripts when a branch in a repo gets a merged Pull Request. See **Configuration** section for more information.

Can manage `ping` and merged `pull_request` events now.

## Installation
* Clone the repo (not published to npmjs.org yet)
* Copy `config/tempate/default.js` to `config/default.js` and configure the app (see **Configuration** section below)
* Start the app by doing one of the following:
  * install PM2 globally by running `npm i pm2 -g`, create `config/pm2/app.config.js` file based on `config/pm2/template/base.config.js` and run `npm start`
  * run `node bin/index.js`
  * or use your favorite process manager to run `bin/index.js` 

## Configuration
Config object has following properties:
* **stopWord** (_default /no-deploy_) - you can add this stop word into your pull request description to prevent CI Little Helper from processing the PR
* **branches** (_default ['develop']_) - branch names to watch
* **repos** - list of repositories to watch:
  * **name** - name of a repo
  * **script** - path to a bash script to execute
  * **secret** - secret key from GitHub Hooks