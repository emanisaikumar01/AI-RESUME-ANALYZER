# 🧠 AI-RESUME-ANALYZER

An AI-powered multi-agent Resume Analyzer that evaluates resumes, identifies skill gaps, provides improvement suggestions, and matches candidates with relevant job roles. This project uses **multi-agent collaboration**, **Gemini LLM**, **memory**, and **parallel evaluation logic** to enhance resume quality and accelerate the hiring process.

## 🚀 Live Demo
🔗 **Frontend:** https://ai-resume-analyzer-1cnm5hcn1-sai-kumar-s-projects.vercel.app/  
🔗 **Backend API:** https://ai-resume-analyzer-0cok.onrender.com  
📂 **GitHub Repository:** https://github.com/emanisaikumar01/AI-RESUME-ANALYZER

---

## 🎯 Problem Statement
Resume writing is time-consuming and confusing for many job seekers. Most applicants fail due to:
- Bad formatting
- Missing critical keywords
- Lack of ATS optimization
- No understanding of skills required for target roles

This system solves that by automatically analyzing resumes using AI, identifying weaknesses, matching jobs, and giving improvement suggestions instantly.

---

## 💡 Solution
The **AI Resume Analyzer** leverages **multiple intelligent agents** to:
- Parse and understand uploaded resumes
- Score and evaluate resume quality
- Detect missing skills & provide improvement steps
- Recommend job roles aligned with experience & skills
- Maintain context & memory to support updates

---

## 🧠 Multi-Agent Architecture
| Agent | Responsibility |
|--------|----------------|
| **Resume Agent** | Extracts and evaluates resume content |
| **Skill Gap Agent** | Identifies missing skills & improvement roadmap |
| **Job Match Agent** | Suggests jobs based on skills & profile |
| **Memory Service Agent** | Maintains user context and history |

---

## 🏗️ Tech Stack
### **Frontend**
- React / Vite
- Tailwind CSS
- Axios

### **Backend**
- Python Flask / FastAPI
- PDF Resume Parser
- REST API

### **AI / Model**
- **Gemini Flash / Gemini Pro**
- LLM-based scoring and evaluation

### **Tools & Concepts Used**
- Multi-Agent System
- LLM-powered Agents
- Session Memory
- Context Engineering
- Deployment on Cloud

---

## 📌 Features
- Upload resume in PDF format
- AI-generated score & professional suggestions
- Skill gap analysis for target job category
- ATS optimization feedback
- Job recommendations
- Clean UI & responsive frontend

---

## 📁 Project Structure
AI-RESUME-ANALYZER/
│
├── agents/
│ ├── resume_agent.py
│ ├── skill_gap_agent.py
│ ├── job_match_agent.py
│ └── memory_service.py
│
├── backend/
│ └── api and model logic
│
├── frontend/
│ └── React UI + integration
│
├── docs/
├── kaggle/
│ ├── agent-notebook.ipynb
│ └── benchmark-tests.ipynb
└── README.md

yaml
Copy code

---

## 🧪 How to Run Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
Frontend
bash
Copy code
cd frontend
npm install
npm run dev
📦 Deployment
Frontend deployed on: Vercel

Backend deployed on: Render

Environment variables secure (🚫 no API keys committed)

## 📸 Screenshots

https://raw.githubusercontent.com/emanisaikumar01/AI-RESUME-ANALYZER/main/pre%20analysis.png
https://raw.githubusercontent.com/emanisaikumar01/AI-RESUME-ANALYZER/main/post%20analysis.png

📈 Future Enhancements
Support for DOC/DOCX

Resume template auto-generator

Real-time job scraping integration

User login dashboard & history

Analytics insights & scoring metrics

🏆 Kaggle Capstone Track Submission
Track: Enterprise Agents
Why Agents? Multi-agent collaboration reduces manual review time, improves resume quality, and speeds up hiring workflows.

👨‍💻 Author
Sai Kumar E
B.Tech CSE – ICFAI University Hyderabad
LinkedIn: https://linkedin.com/in/
GitHub: https://github.com/emanisaikumar01
