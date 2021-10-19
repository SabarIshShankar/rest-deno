import {Application, Router} from "https://deno.land/x/oak@v6.4.2/mod.ts";
import {APP_HOST, APP_PORT} from './config/config.ts';
import router from './routes/routes.ts';

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

console.log(` started at Post ${APP_PORT}`)
await app.listen(`${APP_HOST}`:${APP_PORT})