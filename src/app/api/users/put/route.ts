import { NextResponse,NextRequest } from 'next/server';
import { UserModel, AddressModel } from '../../../lib/models/user';
import connectDb from '../../../lib/db/connectDb';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../../../types/user';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const verifyToken = (token: string): string | JwtPayload => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export async function PUT(req: NextRequest) {
    try {
        const { firstName, lastName, address, description, title, language } = await req.json();

        if (!firstName && !lastName && !address && !title && !language) {
            return NextResponse.json(
                { error: 'Missing fields to update' },
                { status: 400 }
            );
        }

        await connectDb();

        const tokenCookie = req.cookies.get('token'); 
        const token = tokenCookie ? tokenCookie.value : null;  

        if (!token) {
            return NextResponse.json(
                { error: 'Missing token' },
                { status: 401 }
            );
        }

        let decoded;
        try {
            decoded = verifyToken(token);
        } catch (error) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        if (typeof decoded !== 'object' || !('userName' in decoded)) {
            return NextResponse.json(
                { error: 'Invalid token structure' },
                { status: 401 }
            );
        }

        const decodedUserName = decoded.userName;
        const user = await UserModel.findOne({ userName: decodedUserName }).populate('addressId').lean<User>();

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const updateFields: any = {}; 

        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;
        if (description) updateFields.description = description;
        
        if (address) {
            const addressUpdateFields: any = {};

            if (address.city) addressUpdateFields.city = address.city;
            if (address.street) addressUpdateFields.street = address.street;
            if (address.zipCode) addressUpdateFields.zipCode = address.zipCode;
            if (address.building) addressUpdateFields.building = address.building;

            if (Object.keys(addressUpdateFields).length > 0) {
                const updatedAddress = await AddressModel.findOneAndUpdate({userName:decodedUserName}, addressUpdateFields, { new: true });
                if (updatedAddress) {
                    updateFields.addressId = updatedAddress._id;
                }
            }
        }

        if (title) {
            if (Array.isArray(title)) {
                updateFields.titles = title; 
            } else if (!user.titles.includes(title)) {

                updateFields.titles = [...user.titles, title];
              
            }
            
        }

      
        if (language) {
            if (Array.isArray(language)) {
                updateFields.language = language; 
            } else if (!user.languages.includes(language)) {
                updateFields.language = [...user.languages, language]; 
            }
        }

   
        const updatedUser = await UserModel.findOneAndUpdate({userName:decodedUserName}, updateFields, { new: true });

        if (!updatedUser) {
            return NextResponse.json(
                { error: 'Error updating user' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'User updated successfully', user: updatedUser },
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
        console.error('Error updating user:', error);
        return NextResponse.json(
            { error: 'Error updating user' },
            { status: 500 }
        );
    }
}
