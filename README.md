```npx create-next-app next-login-app```

```npm run dev```

--- 

## **Backend**

Usar la carpeta api de next

![](documentation/img/1.png)

```npm i axios```

```js
const response = await axios.post('/api/auth/login',credentials);
```

Desde el back, api/auth/login

```js
export default function loginHandler(req,res){
    const {email,password} = req.body;
    return res.json('login route')
}
```
---

## **JSON WEB TOKEN**
```npm i jsonwebtoken```
```npm i cookie```

```js
import { jwt } from "jsonwebtoken";
import {serialize} from 'cookie'

// Despues de validadiones de correo y pass, se genera un token
const token = jwt.sign({
    // Expiracion en 30 dias
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 ,
    email: email,
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
```

![](documentation/img/3.png)

![](documentation/img/2.png)

[Ver el contenido del token](https://jwt.io/)

![](documentation/img/4.png)

---

## **Usar Token en Cookie**

En un archivo dentro de la api (http://localhost:3000/dashboard):

```js
export default function profileHandler(req,res) {

    console.log(req.cookies)

    return res.json({
        user: 'User prueba'
    })
}
```

Se obtiene el token que viene desde el frontend:

![](documentation/img/5.png)

Para validar su contenido:
```js
import {verify} from 'jsonwebtoken'

export default function profileHandler(req,res) {
    const {myToken} = req.cookies
    // El secret sirve para desencriptar, se debe usar la misma palabra
    const user = verify(myToken,'secret')
    console.log(user)
}
```
Se obtienen los datos del token:

![](documentation/img/6.png)

Es un token válido?:
```js
import {verify} from 'jsonwebtoken'

export default function profileHandler(req,res) {
    const {myToken} = req.cookies

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
```
---

## **Logout**