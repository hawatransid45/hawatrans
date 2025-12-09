import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TranslationService from '@/models/TranslationService';

// Disable caching untuk endpoint ini
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET - Load all services
export async function GET() {
  try {
    console.log('Connecting to MongoDB...');
    await dbConnect();
    console.log('MongoDB connected successfully');
    
    const services = await TranslationService.find({}).sort({ number: 1 });
    console.log(`Found ${services.length} translation services`);
    
    return NextResponse.json({
      success: true,
      data: services
    });
  } catch (error: any) {
    console.error('Error loading services:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to load services'
    }, { status: 500 });
  }
}

// POST - Save all services (replace all)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { services } = await request.json();
    
    console.log(`Saving ${services.length} services...`);
    
    // Delete all existing services
    await TranslationService.deleteMany({});
    
    // Insert new services
    const savedServices = await TranslationService.insertMany(services);
    
    console.log('Services saved successfully');
    
    return NextResponse.json({
      success: true,
      data: savedServices,
      message: 'Services saved successfully'
    });
  } catch (error: any) {
    console.error('Error saving services:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to save services'
    }, { status: 500 });
  }
}

// PUT - Update single service
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const { id, language, generalPrice, swornPrice } = await request.json();
    
    const updatedService = await TranslationService.findByIdAndUpdate(
      id,
      { language, generalPrice, swornPrice },
      { new: true }
    );
    
    if (!updatedService) {
      return NextResponse.json({
        success: false,
        error: 'Service not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: updatedService
    });
  } catch (error: any) {
    console.error('Error updating service:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to update service'
    }, { status: 500 });
  }
}

// DELETE - Delete single service
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Service ID is required'
      }, { status: 400 });
    }
    
    await TranslationService.findByIdAndDelete(id);
    
    // Renumber remaining services
    const services = await TranslationService.find({}).sort({ number: 1 });
    for (let i = 0; i < services.length; i++) {
      services[i].number = i + 1;
      await services[i].save();
    }
    
    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to delete service'
    }, { status: 500 });
  }
}
