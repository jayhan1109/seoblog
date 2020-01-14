import express from "express";
import { signup, signin,signout,requireSignin } from "../controllers/auth";
export const router = express.Router();

// validators
import { runValidation } from "../validators/index";
import { userSignupValidator, userSigninValidator } from "../validators/auth";

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);

router.get('/secret',requireSignin,(req,res)=>{
  res.json({
    message:'you have access to secret page'
  })
})
