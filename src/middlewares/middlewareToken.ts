import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '@/app/types/user';


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';



export async function verifyTokenMiddleware(req: CustomRequest, res: NextResponse, next: () => void) {
    try {
        const tokenCookie = req.cookies.get('token');
        const token = tokenCookie?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Missing token' },
                { status: 401 }
            );
        }

       
        const decoded: any = jwt.verify(token, JWT_SECRET);

  
        req.userName = decoded.userName;
       
        
        if (!req.userName) {
            return NextResponse.json(
                { error: 'User not authenticated' },
                { status: 401 }
            );
        }
      
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return NextResponse.json(
            { error: 'Invalid token' },
            { status: 401 }
        );
    }
}
