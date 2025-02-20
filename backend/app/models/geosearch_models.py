from pydantic import BaseModel, Field
from typing import Optional

class NearestCentersRequest(BaseModel):
    lat: float
    lng: float
    max_distance: Optional[int] = Field(5000, description="Maximum distance in meters")

class Center(BaseModel):
    _id: str
    loc_id: Optional[int]
    program_name: Optional[str] = None
    full_address: Optional[str] = None
    location: dict
    distance: Optional[float] = None

    phone: Optional[str] = None
    email: Optional[str] = None
    contact_fullname: Optional[str] = None
    contact_title: Optional[str] = None
    dropinHours: Optional[str] = None
    registeredHours: Optional[str] = None