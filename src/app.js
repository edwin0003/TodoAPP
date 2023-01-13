import express from "express"
import { engine } from "express-handlebars";
import session from "express-session";
import bodyParser from "body-parser";
import { resolve } from "path"
import { routerLogin } from "./routers/login.js";
import { routerTodo } from "./routers/todo.js";
import {PrismaSessionStore} from "@quixo3/prisma-session-store"
import { PrismaClient } from "@prisma/client";
const app = express();
// app.set("views", __dirname+ "/views")
app.set('views', resolve('./views'));
app.engine('.hbs', engine({
    extname: '.hbs'
}))

app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
    session({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000 // ms
        },
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(
            new PrismaClient(),
            {
                checkPeriod: 2 * 60 * 1000,  //ms
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined,
            }
        )
    })
);
app.use((req, res, next)=>{
    if(req.session.user){
        res.locals.session= req.session;
    }
    next();

})

app.get('/', (req, res) => {
    res.render('home')
    
})


// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }))

app.use('/', routerLogin)
app.use('/', routerTodo)
export const App = app;

