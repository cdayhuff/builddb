const ibmdb = require('ibm_db');
const dbCredentials = {
    database: process.env.DATABASE,
    hostname: process.env.HOSTNAME,
    port: process.env.PORT,
    protocol: process.env.PROTOCOL,
    uid: process.env.UID,
    pwd: process.env.PWD,
    security: process.env.SECURITY
    
}
const connectionString = `DATABASE=${dbCredentials.database};` +
    `HOSTNAME=${dbCredentials.hostname};` +
    'PORT=30699;' +
    'PROTOCOL=TCPIP;' +
    `UID=${dbCredentials.uid};` +
    `PWD=${dbCredentials.pwd};` +
    'SECURITY=SSL;';

let dbConn = null;

async function connectDb() {
    if (dbConn) {
        return dbConn;
    }

    try {
        dbConn = await ibmdb.open(connectionString);
        console.log('Database connection established.');
        return dbConn;
    } catch (err) {
        console.error('Error connecting to database:', err);
        throw err;
    }
}

module.exports = connectDb;
