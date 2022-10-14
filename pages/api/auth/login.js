import jwt  from "jsonwebtoken";
import {serialize} from 'cookie'

export default function loginHandler(req,res){
    const {email,password} = req.body;

    // Logica de inicio de sesion

    // El email existe en la bdd?

    // La password corresponde al email?

    if(email === 'admin@prueba.com' && password === 'admin'){
        // Si es válido se genera un token
        const token = jwt.sign({
            // Expiracion en 30 dias
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 ,
            email: 'correo',
            username: 'AdminZub'
        },'secret')

        // Al regresar el token se debe guardar como cookie en el navegador
        const serialized = serialize('myToken',token,{
            httpOnly: true,
            // https necesario si es producion
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 *  60 * 60 * 24 * 30, //Expiracion
            path: '/'
        })
        res.setHeader('Set-Cookie',serialized)
        return res.json('LOGIN SUCCESFULLY')
    } else {
        return res.status(401).json({error: 'Invalid email or password'})
    }

    
}