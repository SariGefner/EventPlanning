import { NextResponse, NextRequest } from 'next/server';
import { verifyTokenMiddleware } from '@/middlewares/middlewareToken'; 
import { PostModel, UserModel } from '@/app/lib/models/user';
import connectDb from '@/app/lib/db/connectDb';

export async function PUT(req: NextRequest) {
    try {
      
        await connectDb();
        const userName = await new Promise<string | null>((resolve, reject) => {
            verifyTokenMiddleware(req as any, {} as any, () => {
                resolve((req as any).userName);
            }).catch(reject);
        });

        if (!userName) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { favoritePostID, favoriteUserName } = await req.json();

        let existingConsumer = await UserModel.findOne({ userName });

        if (!existingConsumer) {
                return NextResponse.json(
                    { error: 'user not found' },
                    { status: 404 }
                );
        }

        if (favoritePostID) {
            const index = existingConsumer.likedPostsArr.indexOf(favoritePostID);
            if (index > -1) {
                existingConsumer.likedPostsArr.splice(index, 1);
            }
        }
        if (favoriteUserName) {
            const index = existingConsumer.likedPeople.indexOf(favoriteUserName);
            if (index > -1) {
                existingConsumer.likedPeople.splice(index, 1);
            }
        }
        await existingConsumer.save();

        return NextResponse.json(
            { message: 'User updated successfully' },
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
    } catch (error) {
        console.error('Error updating User:', error);
        return NextResponse.json(
            { error: 'Error updating User' },
            { status: 500 }
        );
    }
}
