import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const response = NextResponse.json(
            { message: 'User logged out successfully' },
            { status: 200 ,
                headers: {
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
                        ? 'https://event-production-fawn.vercel.app'
                        : 'http://localhost:3000',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }
            }
        );

        response.cookies.set('userName', '', {
            httpOnly: false, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 0, 
            path: '/' 
        });

        response.cookies.set('token', '', { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 0, 
            path: '/' 
        });

        return response;

    } catch (error) {
        console.error('Error logging out user:', error);
        return NextResponse.json(
            { error: 'Error logging out user' },
            { status: 500 }
        );
    }
}
