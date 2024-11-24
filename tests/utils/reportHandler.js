const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer'); // Use Puppeteer to generate the PDF

// Function to generate HTML content for the report
function generateHTMLReport(testName, result, additionalInfo = '') {
  return `
    <html>
      <head>
        <title>${testName} Test Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #4CAF50; }
          .result { font-size: 16px; }
          .additional-info { margin-top: 20px; font-size: 14px; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <h1>${testName} Test Report</h1>
        <p class="result">${result}</p>
        <div class="additional-info">
          ${additionalInfo}
        </div>
      </body>
    </html>
  `;
}

// Function to generate the PDF report from the HTML content
async function generatePDF(htmlContent, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent);
  await page.pdf({ path: outputPath, format: 'A4' });

  await browser.close();
}

// Function to handle PDF report generation
async function generateReportPDF(testName, result, additionalInfo = '', outputDir = 'tests/reports') {
  // Dynamically import 'strip-ansi' (ensure you call this from an async function)
  const stripAnsi = (await import('strip-ansi')).default;

  // Clean the additional info by removing any ANSI escape codes
  const cleanAdditionalInfo = stripAnsi(additionalInfo);

  // Generate the HTML content
  const htmlContent = generateHTMLReport(testName, result, cleanAdditionalInfo);

  // Ensure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Use a timestamp to prevent overwriting existing reports
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputPath = path.join(outputDir, `${testName}Report_${timestamp}.pdf`);

  // Generate the PDF using Puppeteer
  await generatePDF(htmlContent, outputPath);

  return outputPath; // Return the path of the generated PDF
}

module.exports = { generateReportPDF };
