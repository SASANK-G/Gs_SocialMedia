import express from 'express';
import { loginuser, registerUser } from '../Controllers/AuthController.js';

const router = express.Router();

// router.get('/', async(req, res)=>{
//   res.send("Auth Route")
// })

router.post('/register', registerUser)
router.post('/login', loginuser)

export default router

