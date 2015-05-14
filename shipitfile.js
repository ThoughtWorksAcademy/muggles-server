module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/muggles-server',
      deployTo: '/tmp/deploy_to/server',
      repositoryUrl: 'git@github.com:thoughtworks-academy/muggles-server.git',
      ignores: ['.git', 'node_modules', '.idea', 'npm-debug.log', 'coverage', 'data', 'participate.js'],
      keepReleases: 2,
      key: 'id_aliyun',
      shallowClone: true,
      branch: 'development'
    },
    staging: {
      servers: 'root@120.25.232.68'
    }
  });
};
