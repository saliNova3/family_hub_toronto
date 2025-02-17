from fastapi import APIRouter
from app.services import ckan_service

router = APIRouter()

@router.get("/centres", summary="Get Earlyon Child and Family Centres Data")
async def get_centres():
    """
    Endpoint to fetch data for Earlyon Child and Family Centres.
    It calls the CKAN service to retrieve the dataset.
    """
    data = ckan_service.get_earlyon_centres_data()
    return data