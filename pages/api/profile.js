import {verify} from 'jsonwebtoken'

export default function profileHandler(req,res) {

    console.log(req.cookies)

    const {myToken} = req.cookies

    if(!myToken){
        return res.status(401).json({
            error: 'no token'
        })
    }

    try {
        const user = verify(myToken,'secret')
        console.log(user)
        return res.json({
            email: user.email,
            username: user.username
        })
    } catch (error) {
        return res.status(401).json({error:'Invalid token'})
    }
   
}