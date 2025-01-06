import { NextResponse, NextRequest } from 'next/server';
import { PostModel, SupplierModel, UserModel } from '@/app/lib/models/user';
import { Title } from '@/app/types/user';
import connectDb from '@/app/lib/db/connectDb';
import { verifyTokenMiddleware } from '@/middlewares/middlewareToken'; 

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    let userName: string | undefined;

    await verifyTokenMiddleware(req as any, {} as NextResponse, () => {
      userName = (req as any).userName;
    });

    const { searchParams } = new URL(req.url);
    const postIdFromQuery = searchParams.get('postId');

    if (!postIdFromQuery) {
      return NextResponse.json(
        { error: 'Missing post id' },
        { status: 400 }
      );
    }

    console.log(postIdFromQuery);

    
    const post = await PostModel.findById(postIdFromQuery)
      .populate({
        path: 'recommendations',
        model: 'Recommendation',
      })
      .populate({
        path: 'postId',
        model: 'ConsumerPost',
      })
      .populate({
        path: 'userDetails',
        select: 'titles', 
      })
      .lean();

    console.log('post', post);

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    let supplierDetails;

    if (userName) {
      const user = await UserModel.findOne({ userName });
      if (
        user?.titles &&
        user.titles.some((title: Title) => Object.values(Title).includes(title as Title))
      ) {
        supplierDetails = await SupplierModel.findOne({ userName }).lean();
      }
    }

    return NextResponse.json(
      {
        message: 'Post retrieved successfully',
        post,
        supplierDetails, 
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin':
            process.env.NODE_ENV === 'production'
              ? 'https://event-production-fawn.vercel.app'
              : 'http://localhost:3000',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
