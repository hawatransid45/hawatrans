import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { initialBlogPosts } from '@/data/blogPosts';

export async function POST() {
  try {
    await dbConnect();
    
    // Check if posts already exist
    const count = await BlogPost.countDocuments();
    
    if (count > 0) {
      return NextResponse.json(
        { message: 'Database already seeded', count },
        { status: 200 }
      );
    }
    
    // Insert initial blog posts
    await BlogPost.insertMany(initialBlogPosts);
    
    return NextResponse.json(
      { message: 'Database seeded successfully', count: initialBlogPosts.length },
      { status: 201 }
    );
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
