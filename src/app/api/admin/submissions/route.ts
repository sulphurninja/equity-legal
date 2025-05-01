import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase, ContactForm } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await connectToDatabase();

    // Get page and limit from query params
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    // Calculate skip
    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    if (search) {
      query = {
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { caseType: { $regex: search, $options: 'i' } },
        ]
      };
    }

    // Get total count
    const total = await ContactForm.countDocuments(query);

    // Get submissions
    const submissions = await ContactForm.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      submissions,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({
      message: 'Error fetching submissions',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
