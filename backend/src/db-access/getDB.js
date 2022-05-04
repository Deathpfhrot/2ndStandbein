const { MongoClient } = require("mongodb")

const dotenv = require("dotenv")
dotenv.config()

const url = process.env.DB_URL;
const client = new MongoClient(url)

const databaseName = process.env.DB_NAME;


let dbReference;
        
async function getDB() {
    
        if(dbReference){
            return (dbReference)    
        } 

        try {
            const connectedClient = await client.connect()
            const db = connectedClient.db(databaseName)
            dbReference = db; // zwischenspeichern damit beim nächsten aufruf die getDB connection nicht erneut aufgebaut wird
            return db

        } catch (error) {
            throw { error: "Failed to connect to database" }
        }
}

module.exports = { getDB }