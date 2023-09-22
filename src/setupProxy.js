const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // The path that triggers the proxy
    createProxyMiddleware({
      target: "http://ec2-3-6-158-164.ap-south-1.compute.amazonaws.com:8080", // The target URL where requests should be forwarded
      changeOrigin: true,
    })
  );
};
