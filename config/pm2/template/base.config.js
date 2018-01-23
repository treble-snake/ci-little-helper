module.exports = {
  apps: [
    {
      name: 'ci-little-helper',
      script: 'bin/index.js',
      cwd: '',
      max_memory_restart: '100M',
      watch: false,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        port: 5025
      },
      env_production: {
        NODE_ENV: 'production',
        port: 3300
      }
    }
  ]
};
