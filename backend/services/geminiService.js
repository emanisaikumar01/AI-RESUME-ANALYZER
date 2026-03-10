const axios = require("axios");

async function analyzeWithGemini(resumeText, jobDescription = "") {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not set in environment");
  }

  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

  const prompt = `
You are an AI Resume Analysis Agent.

Analyze the following resume.

Respond ONLY with valid JSON with these fields:

summary: string
key_skills: array of strings
strengths: array of strings
improvements: array of strings
suggested_roles: array of strings
ats_score: number from 0-100

If a job description is provided also include:

job_match_score: number from 0-100
matched_skills: array of strings
missing_skills: array of strings

Resume text:
${resumeText}

Job Description:
${jobDescription}
`;

  const body = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  const response = await axios.post(url, body, {
    params: { key: apiKey }
  });

  try {
    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    if (jsonStart !== -1 && jsonEnd !== -1) {
      const jsonString = text.slice(jsonStart, jsonEnd + 1);
      return JSON.parse(jsonString);
    }
    return { raw: text };
  } catch (err) {
    console.error("Error parsing Gemini response", err);
    return { raw: response.data };
  }
}

module.exports = { analyzeWithGemini };
