const fs = require('fs');
const path = require('path');
const https = require('https');
const { newsArticles } = require('../src/data/news');

// Create directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images/news');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log(`Created directory: ${imagesDir}`);
}

// Unsplash API for placeholder images
const topics = [
  'farmers-market', 'healthcare', 'orchard', 'education', 'downtown',
  'artist', 'drought', 'cherry-festival', 'basketball-team', 'agriculture-study'
];

// Download images for each article
async function downloadImages() {
  console.log('Downloading news article images...');
  
  for (let i = 0; i < newsArticles.length; i++) {
    const article = newsArticles[i];
    const id = article.id;
    const topic = topics[i % topics.length];
    
    // Skip if no imageUrl defined
    if (!article.imageUrl) continue;
    
    // Extract filename from imageUrl
    const filename = article.imageUrl.split('/').pop();
    const filePath = path.join(imagesDir, filename);
    
    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`Image already exists: ${filename}`);
      continue;
    }
    
    // Use Unsplash source for placeholder images
    const imageUrl = `https://source.unsplash.com/800x600/?${topic}`;
    
    // Download the image
    await downloadImage(imageUrl, filePath);
    console.log(`Downloaded: ${filename}`);
    
    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('All news images downloaded successfully!');
}

// Helper function to download an image
function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete the file if there's an error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Run the download function
downloadImages().catch(err => {
  console.error('Error downloading images:', err);
  process.exit(1);
});
