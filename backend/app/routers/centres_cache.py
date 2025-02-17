from fastapi import APIRouter, HTTPException
from app.services import ckan_service
from app.database import centres_collection

router = APIRouter()

@router.post("/centres/refresh", summary="Refresh Cached Earlyon Centres Data")
async def refresh_centres_cache():
    """
    Fetch the latest centres data from CKAN, store it in MongoDB, and return it.
    We use a fixed document ID ("centres_data") so that we replace the data each time.
    """
    try:
        # Fetch data from CKAN
        centres_data = ckan_service.get_earlyon_centres_data()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data from CKAN: {e}")

    # Upsert (update or insert) the data in MongoDB.
    # We use _id: "centres_data" to have one single cached document.
    result = await centres_collection.replace_one(
        {"_id": "centres_data"},
        {"data": centres_data},
        upsert=True
    )
    return {"message": "Cache refreshed successfully", "data": centres_data}


@router.get("/centres/cached", summary="Get Cached Earlyon Centres Data")
async def get_cached_centres():
    """
    Retrieve the cached centres data from MongoDB.
    If no data is cached, return a 404 error.
    """
    cached_data = await centres_collection.find_one({"_id": "centres_data"})
    if cached_data:
        # Remove the MongoDB _id field from the response for clarity.
        cached_data.pop("_id", None)
        return cached_data
    else:
        raise HTTPException(status_code=404, detail="No cached data available. Please refresh the cache.")