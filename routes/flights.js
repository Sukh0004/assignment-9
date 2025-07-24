const express = require('express');
const Flight = require('../models/Flight');
let flights = require('../data/flights');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');





//GET all flights 
 
router.get('/', async (req, res) => { 
  try { 
    const { from, to } = req.query; 
 
    const filter = {}; 
    if (from) filter.from = from; 
    if (to) filter.to = to; 
 
    const flights = await Flight.find(filter); 
    res.json(flights.map(f => ({ ...f._doc, id: f._id }))); 
  } catch (err) { 
    res.status(500).json({ error: 'Failed to fetch flights' 
}); 
  } 
}); 

//GET flight by ID 
 
router.get('/:id',verifyToken, async (req, res) => { 
  try { 
    const f = await Flight.findById(req.params.id); 
    f ? res.json({ ...f._doc, id: f._id }) : 
res.status(404).json({ error: 'Flight not found' }); 
  } catch { 
    res.status(400).json({ error: 'Invalid ID' }); 
  } 
}); 

//Post a new flight
router.post('/', async (req, res) => { 
  try { 
    const newFlight = new Flight(req.body); 
    const saved = await newFlight.save(); 
    res.status(201).json({ ...saved._doc, id: saved._id }); 
  } catch { 
    res.status(400).json({ error: 'Invalid input' }); 
  } 
}); 



//DELETE a flight 
 
router.delete('/:id', async (req, res) => { 
  try { 
    const deleted = await 
Flight.findByIdAndDelete(req.params.id); 
    deleted ? res.json({ message: 'Flight deleted' }) : 
res.status(404).json({ error: 'Not found' }); 
  } catch { 
    res.status(400).json({ error: 'Invalid ID' }); 
  } 
}); 

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, try again later.'
});
router.use(limiter);
router.get('/:id', (req, res) => {
    const flight = flights.find(f => String(f.id) === req.params.id);
    if (!flight) return res.status(404).json({ error: "Flight not found" });
    res.json(flight);
})
router.post('/',
    body('from').notEmpty(),
    body('to').notEmpty(),
    body('price').isNumeric(),
    body('airline').notEmpty(),
    body('duration').notEmpty(),
    body('departureTime').isISO8601(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({
            errors:
                errors.array()
        });
        const newFlight = { id: Date.now(), ...req.body };
        flights.push(newFlight);
        res.status(201).json(newFlight);
    }
);

module.exports = router;