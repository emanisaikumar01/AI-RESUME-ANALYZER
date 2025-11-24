"""
Memory service for storing simple per-user state in memory (toy example for course).
In production, you would swap this with a database or vector store.
"""
from typing import Dict, Any


class InMemorySessionService:
    def __init__(self):
        self._store: Dict[str, Dict[str, Any]] = {}

    def get(self, session_id: str) -> Dict[str, Any]:
        return self._store.setdefault(session_id, {})

    def set(self, session_id: str, key: str, value: Any) -> None:
        session = self._store.setdefault(session_id, {})
        session[key] = value

    def clear(self, session_id: str) -> None:
        self._store.pop(session_id, None)
