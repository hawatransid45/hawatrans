import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ServiceContent from '@/models/ServiceContent';

// GET all service content
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const contents = await ServiceContent.find({});
    
    // Convert array to object dengan key sebagai property
    const contentMap: Record<string, string> = {};
    contents.forEach(item => {
      contentMap[item.key] = item.content;
    });

    return NextResponse.json({ success: true, data: contentMap });
  } catch (error: any) {
    console.error('GET /api/services/content error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT update service content
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { key, content } = body;

    if (!key || !content) {
      return NextResponse.json(
        { success: false, error: 'Key and content are required' },
        { status: 400 }
      );
    }

    // Upsert: update if exists, create if not
    const updated = await ServiceContent.findOneAndUpdate(
      { key },
      { content, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('PUT /api/services/content error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
