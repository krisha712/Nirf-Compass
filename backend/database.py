from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "nirf_compass"

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# Collections
history_collection = db["search_history"]
