import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

// GET all blog posts or filter by locale
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale');

    const filter = locale ? { locale } : {};
    const posts = await BlogPost.find(filter).sort({ publishedAt: -1 });

    return NextResponse.json({ success: true, data: posts });
  } catch (error: any) {
    console.error('GET /api/blog error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST create new blog post
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    console.log('POST /api/blog body:', body);
    
    const post = await BlogPost.create(body);
    console.log('Created post:', post);

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/blog error:', error);
    console.error('Error details:', error.errors);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create post' },
      { status: 400 }
    );
  }
}
