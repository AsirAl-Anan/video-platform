const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Replace with your MongoDB URI
const dbName = "social";       // Replace with your database name

async function removeAllCollections() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);

        const collections = await db.collections();
        for (const collection of collections) {
            await db.collection(collection.collectionName).drop();
            console.log(`Dropped collection: ${collection.collectionName}`);
        }
        console.log("All collections removed successfully.");
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

removeAllCollections();