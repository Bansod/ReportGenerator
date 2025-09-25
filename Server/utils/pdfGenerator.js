const puppeteer = require("puppeteer");

async function generatePDFBuffer(mappedData, sessionId) {
  const dateStr = new Date().toLocaleDateString();

  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1, h2, h3 { margin: 0; }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #444;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .title {
            font-size: 20px;
            font-weight: bold;
            color: #222;
          }
          .date {
            font-size: 14px;
            color: #555;
          }
          .session-title {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            margin: 20px 0;
            color: #333;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
            font-size: 14px;
          }
          th {
            background-color: #f5f5f5;
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="header">
          <div class="title">Watch Your Health</div>
          <div class="date">${dateStr}</div>
        </div>

        <!-- Dynamic Session Title -->
        <div class="session-title">Analysis for ${sessionId}</div>

        <!-- Data Sections -->
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
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({ format: "A4", margin: { top: "40px", bottom: "40px" } });
  await browser.close();

  return pdfBuffer;
}

module.exports = { generatePDFBuffer };
