import * as express from 'express';
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(express.json())
const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('SingleStore');
});

router.post('/setup', (req, res, next) => {
    console.log("////", req.body)
    res.json('/SETUP!');
});

export default router;