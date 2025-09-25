const { assessments } = require("../data/data");
const { assessmentConfig } = require("../config/assessmentConfig");
const { mapDataToConfig } = require("../utils/dataMapper");
const { generatePDFBuffer } = require("../utils/pdfGenerator");

async function generateReport(req, res) {
  const { session_id } = req.body;

  const data = assessments.find(a => a.session_id === session_id);
  if (!data) return res.status(404).json({ error: "Session not found" });

  const config = assessmentConfig[data.assessment_id];
  if (!config) return res.status(400).json({ error: "Assessment config not found" });

  const mappedData = mapDataToConfig(data, config);

  try {
    const pdfBuffer = await generatePDFBuffer(mappedData, session_id);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=${session_id}.pdf`,
    });

    return res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to generate PDF" });
  }
}

module.exports = { generateReport };
