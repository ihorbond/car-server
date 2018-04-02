module.exports = (io) => {

const express = require('express');
const router  = express.Router();
const path    = require('path');
const GPIO    = require('onoff').Gpio;

const carLock = new GPIO(16, 'out');
const carUnlock = new GPIO(20, 'out');
const carTrunk = new GPIO(21, 'out');

carLock.writeSync(0);
carUnlock.writeSync(0);
carTrunk.writeSync(0);

router.get('/lock', (req, res, next) => {
	carLock.writeSync(1);
	setTimeout(() => {
		carLock.writeSync(0);
		}, 1000);
	console.log("lock car received");
	res.send(200);
	});
	
	
router.get('/unlock', (req, res, next) => {
	carUnlock.writeSync(1);
	setTimeout(() => {
		carUnlock.writeSync(0);
		}, 1000);
	console.log("unlock car received");
	res.sendStatus(200);
	});	
	

router.get('/trunk', (req, res, next) => {
	carTrunk.writeSync(1);
	setTimeout(() => {
		carTrunk.writeSync(0);
		}, 1000);
	console.log("trunk received");
	res.sendStatus(200);
	});
	
	
router.get('/windows', (req, res, next) => {
	console.log("windows received");
	carUnlock.writeSync(1);
	setTimeout(() => {
		carUnlock.writeSync(0);
		res.sendStatus(200);
		}, 6000);
	
	
	});
	
return router;

}
