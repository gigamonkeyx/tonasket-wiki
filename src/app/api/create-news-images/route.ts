import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { newsArticles } from '@/data/news';

export async function GET() {
  try {
    // Create directory if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public');
    const imagesDir = path.join(publicDir, 'images');
    const newsImagesDir = path.join(imagesDir, 'news');
    
    if (!fs.existsSync(newsImagesDir)) {
      fs.mkdirSync(newsImagesDir, { recursive: true });
    }
    
    // Create placeholder images for each article
    const createdImages = [];
    
    for (const article of newsArticles) {
      if (article.imageUrl) {
        // Extract filename from imageUrl
        const filename = article.imageUrl.split('/').pop();
        if (!filename) continue;
        
        const filePath = path.join(newsImagesDir, filename);
        
        // Skip if file already exists
        if (fs.existsSync(filePath)) {
          createdImages.push(`${filename} (already exists)`);
          continue;
        }
        
        // Create a simple placeholder image (1x1 pixel transparent PNG)
        const placeholderImage = Buffer.from(
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
          'base64'
        );
        
        fs.writeFileSync(filePath, placeholderImage);
        createdImages.push(filename);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'News images created successfully',
      imagesDir: newsImagesDir,
      createdImages
    });
  } catch (error) {
    console.error('Error creating news images:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create news images',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
