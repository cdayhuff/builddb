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
//corey  'HOSTNAME=19af6446-6171-4641-8aba-9dcff8e1b6ff.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud;' +
//'PORT=30699;' +
//'PROTOCOL=TCPIP;' +
//'UID=yhj69774;' +
//'PWD=ZmevhWI8wQH4q1tQ;' +
//'SECURITY=SSL;';

const connectionString = 'DATABASE=bludb;' +
    'HOSTNAME=125f9f61-9715-46f9-9399-c8177b21803b.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud;' +
    'PORT=30426;' +
    'PROTOCOL=TCPIP;' +
    'UID=mqd26227;' +
    'PWD=cOmxjmlDKJNxItn2;' +
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
