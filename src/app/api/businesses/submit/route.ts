import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Business } from '@/data/businesses';
import { generateUniqueId } from '@/services/businessEnrichment/utils/idGenerator';
import { normalizeAddress, normalizePhone, normalizeBusinessName, normalizeWebsite, normalizeCategory } from '@/services/businessEnrichment/utils/dataNormalizer';

const prisma = new PrismaClient();

/**
 * POST /api/businesses/submit
 * 
 * Handles business submission from the submission form.
 * Validates the submission, normalizes the data, and saves it to the database.
 * The submission is marked as pending for admin review.
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const businessData: Partial<Business> = await request.json();
    
    // Validate required fields
    if (!businessData.name || !businessData.description || !businessData.address || !businessData.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Normalize data
    const normalizedData = {
      ...businessData,
      name: normalizeBusinessName(businessData.name),
      address: normalizeAddress(businessData.address),
      phone: normalizePhone(businessData.phone),
      website: businessData.website ? normalizeWebsite(businessData.website) : undefined,
      category: normalizeCategory(businessData.category),
    };
    
    // Generate a unique ID
    const id = generateUniqueId(normalizedData.name, normalizedData.address);
    
    // Check if business already exists
    const existingBusiness = await prisma.business.findFirst({
      where: {
        OR: [
          { id },
          { name: normalizedData.name },
          { 
            AND: [
              { address: normalizedData.address },
              { phone: normalizedData.phone }
            ]
          }
        ]
      }
    });
    
    if (existingBusiness) {
      return NextResponse.json(
        { error: 'A business with this name or address already exists' },
        { status: 409 }
      );
    }
    
    // Create business submission record
    const submission = await prisma.businessSubmission.create({
      data: {
        id,
        name: normalizedData.name,
        description: normalizedData.description,
        category: normalizedData.category || 'Services',
        subcategory: normalizedData.subcategory,
        address: normalizedData.address,
        phone: normalizedData.phone,
        email: normalizedData.email,
        website: normalizedData.website,
        hours: normalizedData.hours,
        founded: normalizedData.founded,
        services: normalizedData.services as string[],
        products: normalizedData.products as string[],
        socialMedia: normalizedData.socialMedia as any,
        status: 'PENDING',
        submittedAt: new Date(),
      }
    });
    
    // Send notification email to admin (in a real implementation)
    // await sendNotificationEmail(submission);
    
    return NextResponse.json({
      success: true,
      message: 'Business submission received and pending review',
      submissionId: submission.id
    });
    
  } catch (error) {
    console.error('Error processing business submission:', error);
    return NextResponse.json(
      { error: 'Failed to process business submission' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/businesses/submit
 * 
 * Returns the status of a business submission.
 * Query parameters:
 * - id: The submission ID
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const submissionId = searchParams.get('id');
    
    if (!submissionId) {
      return NextResponse.json(
        { error: 'Missing submission ID' },
        { status: 400 }
      );
    }
    
    const submission = await prisma.businessSubmission.findUnique({
      where: { id: submissionId }
    });
    
    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      id: submission.id,
      name: submission.name,
      status: submission.status,
      submittedAt: submission.submittedAt,
      reviewedAt: submission.reviewedAt,
      message: getStatusMessage(submission.status)
    });
    
  } catch (error) {
    console.error('Error fetching business submission:', error);
    return NextResponse.json(
      { error: 'Failed to fetch business submission' },
      { status: 500 }
    );
  }
}

/**
 * Get a user-friendly message based on submission status
 */
function getStatusMessage(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'Your submission is pending review by our team.';
    case 'APPROVED':
      return 'Your submission has been approved and added to the directory.';
    case 'REJECTED':
      return 'Your submission was not approved. Please contact us for more information.';
    case 'NEEDS_INFO':
      return 'We need additional information about your business. Please check your email.';
    default:
      return 'Your submission is being processed.';
  }
}
