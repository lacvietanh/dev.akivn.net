import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đường dẫn đến thư mục content
const contentDir = path.join(__dirname, '../content');
const baseUrl = 'https://dev.akivn.net';
const outputPath = path.join(__dirname, '../../public/sitemap.xml');

// Hàm đệ quy để tìm tất cả các file .md trong thư mục
function findMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findMarkdownFiles(filePath, fileList);
    } else if (path.extname(file) === '.md') {
      // Chuyển đổi đường dẫn file thành URL
      let relativePath = path.relative(contentDir, filePath);
      relativePath = relativePath.replace(/\.md$/, '');
      
      // Tách thư mục và tên file
      const pathParts = path.dirname(relativePath).split(path.sep);
      const fileName = path.basename(relativePath);
      
      // Tạo URL từ đường dẫn
      let url = '/' + pathParts[0] + '/' + fileName;
      
      fileList.push({
        url: baseUrl + url,
        lastmod: new Date(stat.mtime).toISOString().split('T')[0]
      });
    }
  });
  
  return fileList;
}

async function generateSitemap() {
  try {
    // Tìm tất cả file markdown
    const markdownFiles = findMarkdownFiles(contentDir);
    
    // Thêm trang chủ
    const sitemapEntries = [
      {
        url: baseUrl,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '1.0'
      },
      ...markdownFiles.map(file => ({
        ...file,
        changefreq: 'monthly',
        priority: '0.8'
      }))
    ];
    
    // Tạo sitemap XML
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    sitemapEntries.forEach(entry => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${entry.url}</loc>\n`;
      sitemap += `    <lastmod>${entry.lastmod}</lastmod>\n`;
      sitemap += `    <changefreq>${entry.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${entry.priority}</priority>\n`;
      sitemap += '  </url>\n';
    });
    
    sitemap += '</urlset>';
    
    // Lưu sitemap
    fs.writeFileSync(outputPath, sitemap);
    console.log(`✅ Đã tạo sitemap.xml với ${sitemapEntries.length} URLs`);
  } catch (error) {
    console.error('❌ Lỗi khi tạo sitemap:', error);
  }
}

// Chạy hàm tạo sitemap
generateSitemap();
