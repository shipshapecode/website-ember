/* eslint-env node */
const FastBootAppServer = require('fastboot-app-server');

const server = new FastBootAppServer({
  distPath: 'dist',
  gzip: true,
  beforeMiddleware(app) {
    app.use((request, response, next) => {
      if (request.headers['x-forwarded-proto'] === 'https') {
        return next();
      } else {
        return response.redirect(301, `https://${request.hostname}${request.url}`);
      }
    });
  }
});

server.start();
