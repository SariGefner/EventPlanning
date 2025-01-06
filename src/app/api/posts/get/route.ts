
import { NextResponse } from 'next/server';
import { PostModel } from '../../../lib/models/user';
import connectDb from '../../../lib/db/connectDb';

export async function GET(req: Request) {
    try {
        await connectDb();

        const { searchParams } = new URL(req.url);
     
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const skip = (page - 1) * limit;

        const title = searchParams.get('title');
        const username = searchParams.get('username');
        const eventCategory = searchParams.get('eventCategory');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const Id = searchParams.get('postId');
        let query: any = {};

        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }
        

        if (username) {
            query.userName = { $regex: username, $options: 'i' };
        }

        if (eventCategory) {
            query.eventCategory = { $regex: eventCategory, $options: 'i' };
        }

        if (startDate) {
            query.createDate = { $gte: new Date(startDate) };
        }

        if (endDate) {
            query.createDate = {
                ...query.createDate,
                $lte: new Date(endDate)
            };
        }

        if (Id) {
            query._id = Id; // הוספת תנאי לשדה postId
        }
        console.log('Query:', query);
     
    
        const posts = await PostModel.find(query)
        .skip(skip)
        .limit(limit)
        .populate({
            path: 'userDetails', // שם וירטואלי לשדה
            select: 'titles', // מחזיר רק את שדה titles 
        }).select('userName title description createDate')
        .lean();

        const totalPosts = await PostModel.countDocuments(query);
        console.log('Page:', page);
        console.log('Limit:', limit);
        console.log('Skip:', skip);
        
        return NextResponse.json(
            {
                message: 'Posts retrieved successfully',
                posts: posts,
                totalPosts: totalPosts,
                totalPages: Math.ceil(totalPosts / limit),
                currentPage: page,
            },
            {
                 status: 200 ,
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
        console.error('Error retrieving posts:', error);
        return NextResponse.json(
            { error: 'Error retrieving posts' },
            { status: 500 }
        );
    }
}
