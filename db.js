const ibmdb = require('ibm_db');

const connectionString = 'DATABASE=bludb;' +
    'HOSTNAME=19af6446-6171-4641-8aba-9dcff8e1b6ff.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud;' +
    'PORT=30699;' +
    'PROTOCOL=TCPIP;' +
    'UID=yhj69774;' +
    'PWD=ZmevhWI8wQH4q1tQ;' +
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
