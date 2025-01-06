import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'; 
import crypto from 'crypto';
import { UserModel, AuthModel } from '../../../../lib/models/user';
import connectDb from '../../../../lib/db/connectDb';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }
        const normalizedEmail = email.toLowerCase();
        await connectDb();

        const user = await AuthModel.findOne({ email:normalizedEmail });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }


        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiration = new Date();
        otpExpiration.setMinutes(otpExpiration.getMinutes() + 10);

        user.otp = otp;
        user.otpExpiration = otpExpiration;
        await user.save();
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: "eventnorepley@gmail.com", 
                pass: 'sczv wrfg vgpt esas', 
            },tls: {
                rejectUnauthorized: false 
            } 
           
        });
    


        const mailOptions = {
            from: 'eventnorepley@gmail.com',
            to: email,
            subject: 'Your OTP for password reset',
            text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email: ', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return NextResponse.json(
            { message: 'OTP sent to email' },
            { status: 200 ,
                headers: {
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
                        ? 'https://event-planning-six.vercel.app'
                        : 'http://localhost:3000',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }
            }
        );
    } catch (error) {
        console.error('Error sending OTP:', error);
        return NextResponse.json(
            { error: 'Error sending OTP' },
            { status: 500 }
        );
    }
}