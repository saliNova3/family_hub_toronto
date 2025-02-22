
from fastapi import APIRouter, HTTPException
from typing import List
from app.models.geosearch_models import NearestCentersRequest, Center
from app.database import database



router = APIRouter()



@router.post("/centres/near", response_model=List[Center])
async def get_nearest_centers(query: NearestCentersRequest):
    """
    Returns centers sorted by distance from the given coordinates.
    """
    # Use the collection that holds individual center records
    collection = database['toronto_family_centres']

    # Add debug logging
    print(f"Received query: {query}")
    print(f"Collection exists: {await collection.count_documents({})}")

    # Create a GeoJSON Point from the user's coordinates
    user_location = {
        "type": "Point",
        "coordinates": [query.lng, query.lat]
    }
    
    try:
        # Build an aggregation pipeline using $geoNear to sort centers by distance.
        pipeline = [
            {
                "$geoNear": {
                    "near": user_location,
                    "distanceField": "distance",
                    "maxDistance": query.max_distance,
                    "spherical": True
                }
            },
            {
                "$project": {
                    "_id": 1,
                    "loc_id": 1,
                    "program_name": 1,
                    "full_address": 1,
                    "location": 1,
                    "distance": 1
                }
            },
            {"$limit": 50}  # Limit the results if needed
        ]
        results = await collection.aggregate(pipeline).to_list(length=50)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    # Convert ObjectId to string for each document.
    for result in results:
        result["_id"] = str(result["_id"])
    # Ensure the _id is being passed correctly to the frontend
        if not result["_id"]:
            print(f"Missing _id for result: {result}")
    
    return results


