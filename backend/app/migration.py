import json
from pymongo import MongoClient, GEOSPHERE
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Connect to MongoDB
MONGODB_URI = os.getenv("MONGO_DETAILS")
if not MONGODB_URI:
    raise Exception("MONGO_DETAILS is not set in your .env file")

client = MongoClient(MONGODB_URI)
db = client['family_hub_toronto']
source_collection = db['centres_collection']
target_collection = db['toronto_family_centres']

print("Connected to MongoDB Atlas.")

# First, drop the target collection to ensure a clean import
target_collection.drop()
print("Dropped existing collection to prevent duplicates.")

# Get the container document
container_doc = source_collection.find_one()
if not container_doc or 'data' not in container_doc:
    print("No data container found in the collection.")
    exit()

# Access nested data
try:
    data_container = container_doc['data']['data']
    dataset_id = next(iter(data_container.keys()))
    records = data_container[dataset_id]['records']
    print(f"Found {len(records)} records in dataset {dataset_id}")
except (KeyError, StopIteration) as e:
    print(f"Error accessing records: {e}")
    exit()

# Track processed records to avoid duplicates
processed_loc_ids = set()
processed_count = 0

for record in records:
    # Skip records without loc_id
    loc_id = record.get("loc_id")
    if not loc_id:
        print(f"Skipping record without a valid loc_id: {record.get('program_name')}")
        continue
    
    # Skip if we've already processed this loc_id
    if loc_id in processed_loc_ids:
        print(f"Skipping duplicate loc_id: {loc_id}")
        continue
    
    processed_loc_ids.add(loc_id)
    
    # Create center document
    centre = {k: v for k, v in record.items()}
    centre["_id"] = str(loc_id)
    
    # Process location data
    new_location = None
    # Try to parse geometry field
    geometry = record.get('geometry')
    if geometry and isinstance(geometry, str):
        try:
            geo_obj = json.loads(geometry)
            if isinstance(geo_obj, dict) and geo_obj.get("type") == "Point" and "coordinates" in geo_obj:
                new_location = geo_obj
            else:
                print(f"Invalid GeoJSON for record {loc_id}: {geo_obj}")
        except json.JSONDecodeError as e:
            print(f"Failed to parse geometry for record {loc_id}: {e}")

    # Fallback to lat/lng if geometry parsing failed
    if not new_location and 'lat' in record and 'lng' in record:
        lat = record.get('lat')
        lng = record.get('lng')
        if lat is not None and lng is not None:
            try:
                lat_val = float(lat)
                lng_val = float(lng)
                new_location = {"type": "Point", "coordinates": [lng_val, lat_val]}
            except (ValueError, TypeError) as e:
                print(f"Error converting coordinates for record {loc_id}: {e}")
    
    # Skip records without valid location data
    if not new_location:
        print(f"Record {loc_id} skipped: no valid coordinates found.")
        continue
    
    centre['location'] = new_location
    
    # Insert the document
    try:
        target_collection.insert_one(centre)
        processed_count += 1
    except Exception as e:
        print(f"Error inserting record {loc_id}: {e}")

print(f"Processed and inserted {processed_count} unique records with location data.")

# Create 2dsphere index
target_collection.create_index([("location", GEOSPHERE)])
print("Created 2dsphere index on 'location' field.")

# Print a sample document
sample = target_collection.find_one()
if sample:
    print("\nSample processed document:")
    print(f"Program: {sample.get('program_name')}")
    print(f"Address: {sample.get('full_address')}")
    print(f"Location: {sample.get('location')}")
    print(f"loc_id (as _id): {sample.get('_id')}")