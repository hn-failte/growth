const Koa = require("koa");
const KoaRouter = require("@koa/router");
const jwt = require("koa-jwt");

const config = require("./config");
const indexRouter = require("./router/indexRouter");
const loginRouter = require("./router/loginRouter");
const taskRouter = require("./router/taskRouter");

const app = new Koa();
const router = new KoaRouter();

router
  .use(async (ctx, next) => {
    if (ctx.query.token) {
      // console.log(ctx.header);
      next();
    } else {
      ctx.status = 403;
      ctx.body = "未登录";
    }
  })
  .use("/", indexRouter.routes(), indexRouter.allowedMethods())
  .use("/login", loginRouter.routes(), loginRouter.allowedMethods())
  .use("/task", taskRouter.routes(), taskRouter.allowedMethods());

app
  .use(router.routes())
  .use(router.allowedMethods())
  // .use(jwt({ secret: "" }))
  .listen(config.port, config.host, () => {
    console.log(
      `api is now on: ${config.protocol}://${config.host}:${config.port}`
    );
  });
