import motor.motor_asyncio
import os
import certifi  # For TLS/SSL certificate verification
from dotenv import load_dotenv

load_dotenv()


MONGO_DETAILS = os.getenv("MONGO_DETAILS")
client = motor.motor_asyncio.AsyncIOMotorClient(
    MONGO_DETAILS,
    tls=True,
    tlsCAFile=certifi.where()  
)
database = client["family_hub_toronto"]

centres_collection = database.get_collection("toronto_family_centres")
