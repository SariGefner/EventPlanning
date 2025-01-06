
import { NextResponse } from 'next/server';
import { UserModel } from '../../../lib/models/user';  
import connectDb from '../../../lib/db/connectDb';

export async function GET(req: Request) {
    try {
        await connectDb();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const skip = (page - 1) * limit;

        const city = searchParams.get('city');
        const titles = searchParams.get('title')?.split(','); 
        const languages = searchParams.get('language')?.split(','); 
        const userName = searchParams.get('userName'); 

        let query: any = {};

      
        if (city) {
            query['addressId.city'] = { $regex: city, $options: 'i' };
            console.log('City query:', query['addressId.city']);  
        }
        

        if (titles && titles.length > 0) {
            query.titles = { $in: titles.map(title => new RegExp(title, 'i')) }; 
        }

        if (languages && languages.length > 0) {
            query.languages = { $in: languages.map(language => new RegExp(language, 'i')) }; 
        }

        if (userName) {
            query.userName = { $regex: userName, $options: 'i' }; 
        }

        console.log('Query:', query);

        const users = await UserModel.find(query)
            .skip(skip)
            .limit(limit)
            .populate('addressId', 'city')
            .select('userName email phone titles languages profileImage')
            .lean();

        const totalUsers = await UserModel.countDocuments(query);

        return NextResponse.json(
            {
                message: 'Users retrieved successfully',
                users: users,
                totalUsers: totalUsers,
                totalPages: Math.ceil(totalUsers / limit),
                currentPage: page,
            },
            { 
                status: 200,
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
    } catch (error) {
        console.error('Error retrieving users:', error);
        return NextResponse.json(
            { error: 'Error retrieving users' },
            { status: 500 }
        );
    }
}
