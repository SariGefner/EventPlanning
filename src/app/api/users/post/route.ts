
import connectDb from '@/app/lib/db/connectDb';
import bcrypt from 'bcryptjs';
import { generateToken, setAuthCookies } from '@/middlewares/authMiddleware';
import { Title } from '@/app/types/user';
import { AddressModel, AuthModel, ImgModel, SupplierModel, UserModel } from '@/app/lib/models/user';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
    try {

        const {
            firstName, lastName, userName, email, password, titles,
            phone, languages, address, description, topPrice, startingPrice,
            profileImage
        } = await req.json();
        console.log("profileImage", profileImage);

        if (!firstName || !lastName || !userName || !email || !password || !titles || !phone || !languages || !address || !description) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }





        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const normalizedEmail = email.toLowerCase();

        await connectDb();

        const newAuth = new AuthModel({
            userName,
            email: normalizedEmail,
            password: hashedPassword,
        });
        await newAuth.save();

    
        const updatedAddress = { userName, ...address };

        const newAddress = new AddressModel(updatedAddress);
        await newAddress.save();

       
        const profileImg = new ImgModel({
            imgUrl: profileImage,
        });
        console.log("profileImg",profileImg);
        
        const newUser = new UserModel({
            firstName,
            lastName,
            userName,
            email: normalizedEmail,
            titles: titles,
            phone,
            languages: languages,
            addressId: newAddress._id,
            description,
            postArr: [],
            likedPostsArr: [],
            likedPeople: [],
            profileImage: profileImg.imgUrl
        });
        await newUser.save();

        if (titles.includes(Title)) {
            const newSupplier = new SupplierModel({
                userName,
                startingPrice: startingPrice || 0,
                topPrice: topPrice || 0,
                range: 0,
            });
            await newSupplier.save();
        }



        const token = generateToken(newUser);
        const response = NextResponse.json(
            { message: 'User created successfully' },
            {
                status: 201,
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



        setAuthCookies(response, userName, token);

        return response;

    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Error creating user' },
            { status: 500 }
        );
    }
}

