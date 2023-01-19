import * as express from 'express';
const bodyParser = require('body-parser');

const app = express();

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('SingleStore');
});

router.post('/setup', bodyParser.json(),(req, res, next) => {
    console.log("//setup on the boilerplate side//", { req: req.body });
        res.json('/SETUP!');
});

export default router;