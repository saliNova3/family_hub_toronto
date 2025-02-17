from fastapi import FastAPI
from app.routers import centres, centres_cache

app = FastAPI()

# Include the centres router with prefix
app.include_router(centres.router, prefix="/api")
app.include_router(centres_cache.router, prefix="/api")

@app.get('/')
async def read_root():
    return {"message" : "hello world!"}