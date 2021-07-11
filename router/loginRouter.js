const Router = require("@koa/router");

module.exports = new Router().get("/", async (ctx, next) => {
  ctx.status = 200;
  ctx.body = "login";
  next();
});
