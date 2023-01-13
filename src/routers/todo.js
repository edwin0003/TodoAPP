import express, { Router } from "express"
import { todoApp, addTodo, showTask ,deleteTask, renderUpdateTask, updateTask} from "../controllers/todoController.js";
const authguard= (req,res, next)=>{
        if(req.session.user){
            return next()
        }else{
            return res.redirect('/login')
        }
    
} ;
const router = express.Router();
router.get('/todoADD', todoApp)
router.post('/todoADD', addTodo)
router.get('/list',authguard, showTask)
router.post('/', deleteTask)
router.get('/edit/:id', renderUpdateTask )
router.post('/edit/:id', updateTask)
export const routerTodo= router;