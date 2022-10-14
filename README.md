```npx create-next-app next-login-app```

```npm run dev```

## Backend

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

## JSON WEB TOKEN
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