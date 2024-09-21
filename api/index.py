from fastapi import FastAPI
from supabase import create_client
import os

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

# Initialize Supabase client
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

# Add a new endpoint to interact with Supabase
@app.get("/api/py/supabase-test")
async def supabase_test():
    try:
        # Example: Fetch data from a 'users' table
        response = supabase.table('users').select("*").execute()
        return {"message": "Supabase connection successful", "data": response.data}
    except Exception as e:
        return {"message": "Supabase connection failed", "error": str(e)}