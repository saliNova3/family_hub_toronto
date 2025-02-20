from fastapi import APIRouter, HTTPException
from app.services import ckan_service
from bson import ObjectId
from typing import Optional
from app.models.geosearch_models import Center  
from app.database import database


router = APIRouter()


collection = database["toronto_family_centres"]


@router.get("/centres", summary="Get Earlyon Child and Family Centres Data")
async def get_centres():
    """
    Endpoint to fetch data for Earlyon Child and Family Centres.
    It calls the CKAN service to retrieve the dataset.
    """
    data = ckan_service.get_earlyon_centres_data()
    return data

@router.get("/centres/loc/{loc_id}", response_model=Center)
async def get_center_by_loc_id(loc_id: int):
    # If loc_id is stored as an int in the DB
    doc = await collection.find_one({"loc_id": loc_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Center not found")
    doc["_id"] = str(doc["_id"])  # Convert ObjectId to string
    return doc