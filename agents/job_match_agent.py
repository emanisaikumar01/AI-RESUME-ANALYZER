"""
Job Match Agent.
Simple heuristic matching between resume skills and job skill requirements.
"""
from typing import List, Dict


def score_job_match(resume_skills: List[str], job_skills: List[str]) -> Dict[str, float]:
    rs = {s.lower().strip() for s in resume_skills}
    js = {s.lower().strip() for s in job_skills}
    if not js:
        return {"match_score": 0.0}
    overlap = len(rs & js)
    score = round(100.0 * overlap / len(js), 2)
    return {"match_score": score}
