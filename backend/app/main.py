from fastapi import FastAPI
from app.routers import centres, centres_cache
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


# Configure CORS
origins = [
    "http://localhost:3000",  # Frontend origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include the centres router with prefix
app.include_router(centres.router, prefix="/api")
app.include_router(centres_cache.router, prefix="/api")

@app.get('/')
async def read_root():
    return {"message" : "hello world!"}