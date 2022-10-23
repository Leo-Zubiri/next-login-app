import { NextResponse } from "next/server";
import {jwtVerify} from 'jose'

export async function middleware(request){
    const token = request.cookies.get('myToken')


    if(token === undefined){
        return NextResponse.redirect(new URL('/login',request.url))
    }

    try {
        // Si hay token verificar que sea válido
        const {payload} = await jwtVerify(token,new TextEncoder().encode('secret'))
        console.log(payload)
        return NextResponse.next()
    } catch (error) {
        console.log(error)
        return NextResponse.redirect(new URL('/login',request.url))
        
    }

}

// En que rutas se ejecuta el middleware
export const config = {
    matcher: ['/dashboard','/admin/:path*']
}