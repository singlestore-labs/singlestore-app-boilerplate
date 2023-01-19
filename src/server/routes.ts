import * as express from 'express';

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('SingleStore');
});

router.get('/setup', (req, res, next) => {
    console.log(req)
    res.json('SETUP!');
});

export default router;