import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ContactSettings from '@/models/ContactSettings';

// Disable caching untuk endpoint ini
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET - Load contact settings
export async function GET() {
  try {
    await dbConnect();
    
    // Cari settings yang ada, atau buat default jika belum ada
    let settings = await ContactSettings.findOne({});
    
    if (!settings) {
      // Buat default settings
      settings = await ContactSettings.create({
        whatsappNumber: '6281224000088',
        whatsappNumberFormatted: '+62 812-2400-0088',
        email: 'info@hawatrans.id',
        address: 'Jakarta, Indonesia'
      });
    }
    
    return NextResponse.json({
      success: true,
      data: settings
    });
  } catch (error: any) {
    console.error('Error loading contact settings:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to load contact settings'
    }, { status: 500 });
  }
}

// PUT - Update contact settings
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const { whatsappNumber, whatsappNumberFormatted, email, address } = body;
    
    // Validasi
    if (!whatsappNumber || !whatsappNumberFormatted) {
      return NextResponse.json({
        success: false,
        error: 'WhatsApp number is required'
      }, { status: 400 });
    }
    
    // Update atau create settings
    let settings = await ContactSettings.findOne({});
    
    if (settings) {
      // Update existing
      settings.whatsappNumber = whatsappNumber;
      settings.whatsappNumberFormatted = whatsappNumberFormatted;
      settings.email = email || settings.email;
      settings.address = address || settings.address;
      settings.updatedAt = new Date();
      await settings.save();
    } else {
      // Create new
      settings = await ContactSettings.create({
        whatsappNumber,
        whatsappNumberFormatted,
        email,
        address
      });
    }
    
    return NextResponse.json({
      success: true,
      data: settings,
      message: 'Contact settings updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating contact settings:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to update contact settings'
    }, { status: 500 });
  }
}
