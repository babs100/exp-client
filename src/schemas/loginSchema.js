import Joi from "joi";
const strongPasswordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

const LoginSchema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().regex(
        strongPasswordRegex, 
        'Letters (Upper and Lower case),  number and symbols'
        )
    
})

export default LoginSchema;