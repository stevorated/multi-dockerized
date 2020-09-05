import to from 'await-to-js';
import { Router } from 'express';

import { redisClient, redisPub } from '../config';
import { Value } from '../db';

const router = Router();

router.get('/all', async (_, res) => {
    const [err, response] = await to(Value.find());

    if (err !== null || !response) {
        return res
            .status(410)
            .send({ message: `Error: Bad Connection ${err}` });
    }

    res.send(response);
});

router.get('/current', (_, res) => {
    redisClient?.hgetall('values', (err, vals) => {
        console.log(err);
        if (err) {
            res.status(410).send({ message: 'Error: Bad Connection' });
        }
        res.send(vals);
    });
});

router.post('/', async (req, res) => {
    const number = req.body.index;

    if (parseInt(number) > 40) {
        return res.status(422).send('values too high');
    }

    redisClient?.hset('values', number, 'Nothing Yet');
    redisPub?.publish('insert', number);
    const newValue = new Value();

    Object.assign(newValue, { number });

    const newNumberCreated = await to(newValue.save());

    res.send({ working: true, newNumberCreated });
});

export { router };
