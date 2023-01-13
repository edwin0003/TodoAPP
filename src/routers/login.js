import express, { Router } from "express"
import {login, resgister, storeUser, auth , logouth} from "../controllers/loginController.js"

const router = express.Router();
router.get('/login', login)
router.get('/register', resgister)
router.post('/register', storeUser)
router.post('/login', auth)
router.get('/logout', logouth)

export const routerLogin= router;