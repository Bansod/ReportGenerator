const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const os = require("os");

async function generatePDF(mappedData, sessionId) {
  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { color: #333; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background-color: #f5f5f5; }
        </style>
      </head>
      <body>
        ${mappedData.map(section => `
          <h2>${section.title}</h2>
          <table>
            ${Object.entries(section.fields).map(([key, value]) => `
              <tr><th>${key}</th><td>${value}</td></tr>
            `).join('')}
          </table>
        `).join('')}
      </body>
    </html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);

  const downloadsDir = path.join(os.homedir(), "Downloads");
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }

  const pdfPath = path.join(downloadsDir, `${sessionId}.pdf`);

  await page.pdf({ path: pdfPath, format: "A4" });
  await browser.close();
  return pdfPath;
}

module.exports = { generatePDF };
