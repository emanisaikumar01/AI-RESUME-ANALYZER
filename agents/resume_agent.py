"""
Resume Agent: high-level interface to analyze resume text using Gemini.
This is a Python version for Kaggle / experiments.
"""
import os
import json

try:
    import google.generativeai as genai
except ImportError:
    genai = None


def configure_gemini(api_key: str | None = None):
    api_key = api_key or os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY not set")
    if genai is None:
        raise ImportError("google-generativeai is not installed")
    genai.configure(api_key=api_key)


def analyze_resume_text(text: str) -> dict:
    """Call Gemini to analyze resume text and return a structured dict."""
    if genai is None:
        raise ImportError("google-generativeai is not installed")
    configure_gemini()
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = (
        "You are an AI Resume Analysis Agent. "
        "Analyze the following resume text and respond ONLY with valid JSON with keys: "
        "summary, key_skills, strengths, improvements, suggested_roles, ats_score.\n\n"
        f"Resume text:\n{text}"
    )
    resp = model.generate_content(prompt)
    raw = resp.text
    start = raw.find("{")
    end = raw.rfind("}")
    if start != -1 and end != -1:
        try:
            return json.loads(raw[start : end + 1])
        except Exception:
            pass
    return {"raw": raw}
