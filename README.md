# Toronto Family Hub

Toronto Family Hub is a full-stack web application designed to help families in Toronto easily find early childhood and family support centres. Leveraging open data from the City of Toronto, the application provides location-based search, detailed centre information, and a user-friendly interface.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Attribution & Data Policy](#attribution--data-policy)
- [Contributing](#contributing)
- [License](#license)


## Features

- **Location-based Search:** Users can search for family centres by entering an address or using their current location.
- **Detailed Centre Information:** Each centre’s page displays key details including address, contact information, hours, and website.
- **Responsive Design:** The application adapts to various devices using Material UI components.
- **Open Data Integration:** Data is sourced from the City of Toronto’s Open Data portal, ensuring transparency and reliability.
- **Geospatial Queries:** Utilizes MongoDB’s 2dsphere indexing and FastAPI to return the nearest centres based on user coordinates.

## Technology Stack

- **Backend:**  
  - [FastAPI](https://fastapi.tiangolo.com/)  
  - [Motor (Async MongoDB Driver)](https://motor.readthedocs.io/)  
  - MongoDB Atlas (with geospatial queries)

- **Frontend:**  
  - [React](https://reactjs.org/)  
  - [Material UI (MUI v5)](https://mui.com/)  
  - [React Router](https://reactrouter.com/)

- **Other Tools:**  
  - [Python-dotenv](https://pypi.org/project/python-dotenv/) for environment variable management  
  - [Framer Motion](https://www.framer.com/motion/) for animations  

## Installation

### Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- MongoDB Atlas account (or local MongoDB instance)

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/toronto-family-hub.git
   cd toronto-family-hub/backend


2. **Create a Virtual Environment & Install Dependencies:**
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt

3. **Set Up Environment Variables:**    
    MONGO_DETAILS=mongodb+srv://<username>:<password>@cluster0.mongodb.net/family_hub_toronto?retryWrites=true&w=majority
    GOOGLE_GEOCODING_API_KEY=your_google_geocoding_api_key

4. **Run the Migration Script:**
    python migration.py



### Backend Setup


1. **Navigate to the Frontend Folder:**
    cd ../frontend


2. **Install Node Dependencies:**
    npm install


### Configuration

MongoDB:
The backend uses MongoDB Atlas. Ensure your connection string is correct in the .env file.

API Keys:
If you use a geocoding service, store your API key securely in the .env file.

CORS:
The backend is configured to allow requests from http://localhost:3000 by default.


### Attribution & Data Policy

Toronto Family Hub utilizes open data from the City of Toronto Open Data Portal. This data is provided under the Open Data Licence in accordance with the City of Toronto's Open Data Policy.
We adhere strictly to privacy, security, and confidentiality guidelines as outlined by the relevant legislation.


### Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

### License

This project is licensed under the MIT License. See the LICENSE file for details.


---

This README provides a detailed overview of your project, explains its features and architecture, and includes instructions for setup, configuration, and deployment. Feel free to modify any section to suit your project's specifics.