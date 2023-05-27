const dotenv = require('dotenv');
dotenv.config();
const calls = require('./utils/calls');
const express = require('express');
const connectDb = require('./db');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());


//static files
app.use(express.static('public'));


app.set('view engine', 'ejs');


// ...

app.get('/', async (req, res) => {
    try {
        const conn = await connectDb();
        const chatadmin1Data = await conn.query('SELECT * FROM CHATADMIN1');
        const callStats = await conn.query('SELECT (SELECT SUM(creditnumber) FROM credits) - COUNT(*) AS difference FROM callstats');
        const mCalls = await conn.query('SELECT COUNT(*) AS row_count FROM callstats WHERE DATE_PART(\'year\', calltimestamp) = DATE_PART(\'year\', CURRENT_DATE)   AND DATE_PART(\'month\', calltimestamp) = DATE_PART(\'month\', CURRENT_DATE)');
        const avgForCalls = await conn.query('SELECT AVG(timetoprocess) AS average_time FROM callstats');
        const monthlyBill = calls.calculateBilling(avgForCalls);
        const monthlyCalls = calls.calculateMonthlyCallsCount(mCalls);
        const weeklyCalls = calls.calculateWeeklyCallsCount(callStats);
        res.render('get', {
            chatadmin1: chatadmin1Data,
            instructionLine1: '',
            monthlyBill,
            monthlyCalls,
            weeklyCalls,
            useCaseName: '',
            editMode: false
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while retrieving CHATADMIN1 data.');
    }
});

app.post('/chatadmin', async (req, res) => {
    try {
        const conn = await connectDb();
        const payload = req.body;
        //check use case exists
        const useCaseExists = await conn.query(`SELECT * FROM CHATADMIN1 WHERE USECASENAME = '${payload.usecase}'`);
        if(useCaseExists.length > 0) {
            throw new Error('Use case already exists.');
        }
        
        
        if(!payload.instruction || !payload.usecase) {
            throw new Error('Instruction and use case name are required.');
        }
        const payloadValues = {
            INSTRUCTIONLINE1: payload.instruction?.trim() || "",
            USECASENAME: payload.usecase?.trim() || "",
        }
        await conn.query(`INSERT INTO CHATADMIN1 (INSTRUCTIONLINE1, USECASENAME) VALUES ('${payloadValues.INSTRUCTIONLINE1}', '${payloadValues.USECASENAME}')`);
        res.status(201).json({ message: 'Chat admin data created.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while retrieving creating data.' });
    }
});

app.put('/chatadmin', async (req, res) => {
    try {
        const conn = await connectDb();
        const payload = req.body;
        if(!payload.instruction || !payload.usecase || !payload.id ) {
            throw new Error('Instruction and use case name are required.');
        }
        const payloadValues = {
            INSTRUCTIONLINE1: payload.instruction?.trim() || "",
            USECASENAME: payload.usecase?.trim() || "",
            ID: payload.id
        }
        await conn.query(`UPDATE CHATADMIN1 SET INSTRUCTIONLINE1 = '${payloadValues.INSTRUCTIONLINE1}', USECASENAME = '${payloadValues.USECASENAME}' WHERE ID = ${payloadValues.ID}`);
        res.status(201).json({ message: 'Chat admin data updated.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while retrieving updating data.' });
    }
});

app.delete('/chatadmin', async (req, res) => {
    try {
        const conn = await connectDb();
        const payload = req.body;
        if(!payload.usecase) {
            throw new Error('Use case name is required.');
        }
        const payloadValues = {
            USECASENAME: payload.usecase?.trim() || "",
        }
        await conn.query(`DELETE FROM CHATADMIN1 WHERE USECASENAME = '${payloadValues.USECASENAME}'`);
        res.status(201).json({ message: 'Chat admin data deleted.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while retrieving deleting data.' });
    }
});

app.listen(8080, () => {
    console.log('Server listening on port 8080.');
});
