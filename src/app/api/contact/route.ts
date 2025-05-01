// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, ContactForm } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Get IP address from request
    const ipAddress = req.headers.get('x-forwarded-for') ||
                     req.headers.get('x-real-ip') ||
                     req.cookies.get('client-ip')?.value ||
                     '0.0.0.0';

    // Get user agent
    const userAgent = req.headers.get('user-agent') || 'Unknown';

    // Connect to the database
    await connectToDatabase();

    // Create new contact form submission
    const submission = new ContactForm({
      ...body,
      ipAddress,
      userAgent
    });

    // Save to database
    await submission.save();

    return NextResponse.json({
      message: 'Contact form submitted successfully',
      success: true
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting contact form:', error);

    return NextResponse.json({
      message: 'Error submitting contact form',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
