import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { AuthModel } from '@/app/lib/models/user';
import connectDb from '@/app/lib/db/connectDb';
import { generateToken, setAuthCookies } from '@/middlewares/authMiddleware';

export async function POST(req: Request) {
    try {
        const { email, otp, newPassword } = await req.json();
        if (!email || !otp || !newPassword) {
            return NextResponse.json(
                { error: 'Email, OTP, and new password are required' },
                { status: 400 }
            );
        }

        await connectDb();
        const user = await AuthModel.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const userName = user.userName;  

       
        if (user.otp != otp || new Date() > user.otpExpiration) {

            return NextResponse.json(
                { error: 'Invalid or expired OTP' },
                { status: 400 }
            );
        }


       
        const hashedPassword = await bcrypt.hash(newPassword, 10);
       
        user.password = hashedPassword;

        user.otp = null;
        user.otpExpiration = null;
        await user.save();
        const token = generateToken({ userName, email });

                const response = NextResponse.json(
                    { message: 'Password successfully updated', userName },
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

                response.cookies.set('userName', userName, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 3600,
                    path: '/',
                });

                response.cookies.set('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 3600,
                    path: '/',
                });
                setAuthCookies(response, userName, token);

        return response;

    } catch (error) {
        console.error('Error during password reset:', error);
        return NextResponse.json(
            { error: 'Error during password reset' },
            { status: 500 }
        );
    }
}
