"""
Skill Gap Agent.
Takes current skills and target role expectations and returns missing skills.
"""
from typing import List, Dict


def compute_skill_gaps(current_skills: List[str], target_skills: List[str]) -> Dict[str, list]:
    current = {s.lower().strip() for s in current_skills}
    target = {s.lower().strip() for s in target_skills}
    missing = sorted(target - current)
    overlap = sorted(target & current)
    return {"missing_skills": missing, "matched_skills": overlap}
