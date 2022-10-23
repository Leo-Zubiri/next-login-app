import {verify} from 'jsonwebtoken'
import {serialize} from 'cookie'
export default function logoutHandler(req,res){
    const {myToken} = req.cookies;

    if(!myToken){
        return res.status(401).json({
            error: 'no token'
        })
    }

    try {
        verify(myToken,'secret')
        const serialized = serialize('myToken',null,{
            httpOnly: true,
            // https necesario si es producion
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0, //Expirado
            path: '/'
        })
        res.setHeader("Set-Cookie", serialized);
        res.status(200).json('Logout succesfully')
    } catch (error) {
        return res.status(401).json({
            error: 'Invalid token'
        })
    }
}