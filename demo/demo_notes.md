# ArangaTrip Demo Notes

## Demo Goal

This demo shows that ArangaTrip is a working full-stack hotel booking platform connected to a PostgreSQL database.

The demo proves that the frontend, backend, and database communicate correctly and that user actions create real database updates.

---

## Demo Steps

### 1. Start the backend

```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload