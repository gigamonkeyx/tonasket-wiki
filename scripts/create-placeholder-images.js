const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const createDirectories = () => {
  const dirs = [
    path.join(__dirname, '../public/images/news'),
    path.join(__dirname, '../public/images/businesses')
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
};

// Create placeholder images for news
const createNewsImages = () => {
  const newsImagesDir = path.join(__dirname, '../public/images/news');
  const imageNames = [
    'farmers-market.jpg',
    'healthcare-facility.jpg',
    'orchard.jpg',
    'stem-program.jpg',
    'downtown.jpg',
    'artist.jpg',
    'drought.jpg',
    'cherry-festival.jpg',
    'basketball-team.jpg',
    'agriculture-study.jpg'
  ];
  
  imageNames.forEach(imageName => {
    const filePath = path.join(newsImagesDir, imageName);
    if (!fs.existsSync(filePath)) {
      // Create a simple 1x1 pixel JPEG
      const placeholderImage = Buffer.from(
        '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+/iiiigD/2Q==',
        'base64'
      );
      fs.writeFileSync(filePath, placeholderImage);
      console.log(`Created placeholder image: ${imageName}`);
    } else {
      console.log(`Image already exists: ${imageName}`);
    }
  });
};

// Create placeholder images for businesses
const createBusinessImages = () => {
  const businessImagesDir = path.join(__dirname, '../public/images/businesses');
  const imageNames = [
    'tonasket-coop.jpg',
    'farmers-market.jpg',
    'north-valley-hospital.jpg',
    'tonasket-brewing.jpg',
    'conservation-district.jpg',
    'cultural-center.jpg',
    'hardware-store.jpg',
    'dental-office.jpg',
    'visitor-center.jpg',
    'transportation.jpg',
    'library.jpg',
    'newspaper.jpg',
    'school-district.jpg',
    'riverside-park.jpg',
    'community-garden.jpg'
  ];
  
  imageNames.forEach(imageName => {
    const filePath = path.join(businessImagesDir, imageName);
    if (!fs.existsSync(filePath)) {
      // Create a simple 1x1 pixel JPEG
      const placeholderImage = Buffer.from(
        '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+/iiiigD/2Q==',
        'base64'
      );
      fs.writeFileSync(filePath, placeholderImage);
      console.log(`Created placeholder image: ${imageName}`);
    } else {
      console.log(`Image already exists: ${imageName}`);
    }
  });
};

// Run the script
try {
  console.log('Creating placeholder images...');
  createDirectories();
  createNewsImages();
  createBusinessImages();
  console.log('All placeholder images created successfully!');
} catch (error) {
  console.error('Error creating placeholder images:', error);
  process.exit(1);
}
