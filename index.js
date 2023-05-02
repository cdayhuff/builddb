const express = require('express');
const connectDb = require('./db');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');


// ...

app.get('/', async (req, res) => {
    try {
        const conn = await connectDb();
        const chatadmin1Data = await conn.query('SELECT * FROM CHATADMIN1');
        console.log(chatadmin1Data);
        res.render('get', {
            chatadmin1: chatadmin1Data,
            instructionLine1: '',
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
        console.log(payload);
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

app.listen(3000, () => {
    console.log('Server listening on port 3000.');
});
