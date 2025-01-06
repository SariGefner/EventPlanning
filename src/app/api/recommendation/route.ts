

import { NextRequest, NextResponse } from 'next/server';
import { verifyTokenMiddleware } from '@/middlewares/middlewareToken';
import { PostModel, RecommendationModel } from '@/app/lib/models/user';
import connectDb from '@/app/lib/db/connectDb';




export async function POST(req: NextRequest) {
  try {
    await connectDb();

    let userName: string | undefined;


    await verifyTokenMiddleware(req as any, {} as NextResponse, () => {
      userName = (req as any).userName; 
    });

    const body = await req.json();
    const { postId, text, rate } = body;

    if (!postId || !text || !rate) {
      return NextResponse.json(
        { error: "Missing postId, text, or rate" },
        { status: 400 }
      );
    }
    


    const post = await PostModel.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const recommendation = new RecommendationModel({
      userName,
      text,
      rate,
    });

    await recommendation.save();
    post.recommendations.push(recommendation._id);
    await post.save();

    return NextResponse.json(
      { message: "Recommendation added successfully", recommendation },
      { status: 201 ,
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
    console.error("Error adding recommendation:", error);
    return NextResponse.json(
      { error: "Error adding recommendation" },
      { status: 500 }
    );
  }
}
