
import requests

# Base URL for Toronto's CKAN instance
BASE_URL = "https://ckan0.cf.opendata.inter.prod-toronto.ca"

def fetch_package(package_id: str) -> dict:
    """
    Fetch the metadata for a package (dataset) from the CKAN API.
    
    Args:
        package_id (str): The identifier for the dataset package.
        
    Returns:
        dict: The JSON response containing package metadata.
    """
    url = f"{BASE_URL}/api/3/action/package_show"
    params = {"id": package_id}
    response = requests.get(url, params=params)
    # Convert the response to JSON
    data = response.json()
    return data

def fetch_resource_data(resource_id: str) -> dict:
    """
    Fetch data for a specific resource using datastore_search.
    
    Args:
        resource_id (str): The unique identifier for the resource.
        
    Returns:
        dict: The JSON response containing resource data.
    """
    url = f"{BASE_URL}/api/3/action/datastore_search"
    params = {"id": resource_id}
    response = requests.get(url, params=params)
    # Debug: Check the response status code and text
    if not response.ok:
        raise Exception(f"Request failed with status code {response.status_code}: {response.text}")
    
    try:
        result = response.json()["result"]
    except Exception as e:
        # Print debugging details if JSON decoding fails
        print(f"Error decoding JSON for resource {resource_id}")
        print("Response status code:", response.status_code)
        print("Response text:", response.text)
        raise e  # Re-raise the error after logging
    
    return result

def get_earlyon_centres_data() -> dict:
    """
    Fetch data for Earlyon Child and Family Centres.
    For each resource in the package:
      - If the resource is marked as datastore_active and in JSON format, use datastore_search.
      - Otherwise, if the download URL ends with .json, fetch the JSON file.
      - Otherwise, skip the resource.
    
    Returns:
        dict: A dictionary where keys are resource IDs and values are the fetched data.
    """
    package_id = "earlyon-child-and-family-centres"
    package = fetch_package(package_id)
    centres_data = {}
    errors = {}

    for resource in package["result"]["resources"]:
        resource_id = resource["id"]
        resource_format = resource.get("format", "").lower()
        download_url = resource.get("url", "")
        
        # Only process resources that look like JSON.
        is_json = (resource_format == "json") or download_url.lower().endswith(".json")
        if not is_json:
            print(f"Skipping resource {resource_id} with format '{resource_format}' and URL '{download_url}'")
            continue

        try:
            if resource.get("datastore_active"):
                print(f"Fetching datastore data for resource: {resource_id}")
                data = fetch_resource_data(resource_id)
            else:
                print(f"Fetching download data for resource: {resource_id}")
                data = fetch_download_data(download_url)
            centres_data[resource_id] = data
        except Exception as e:
            print(f"Error fetching data for resource {resource_id}: {e}")
            errors[resource_id] = str(e)

    # Optionally, include errors in your response for debugging:
    return {"data": centres_data, "errors": errors}




def fetch_download_data(download_url: str) -> dict:
    """
    Fetch JSON data directly from a download URL.
    
    Args:
        download_url (str): The URL to download the JSON file.
    
    Returns:
        dict: The JSON content as a Python dictionary.
    """
    response = requests.get(download_url)
    
    if not response.ok:
        raise Exception(f"Download request failed with status code {response.status_code}: {response.text}")
    
    try:
        data = response.json()
    except Exception as e:
        print(f"Error decoding JSON from download URL: {download_url}")
        raise e
    return data


