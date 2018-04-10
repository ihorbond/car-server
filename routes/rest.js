module.exports = (io) => {

const express = require('express');
const router  = express.Router();
const path    = require('path');
const GPIO    = require('onoff').Gpio;
require('dotenv').config();

const localToken = process.env.TOKEN;

const carLock = new GPIO(16, 'out');
const carUnlock = new GPIO(20, 'out');
const carTrunk = new GPIO(21, 'out');

carLock.writeSync(0);
carUnlock.writeSync(0);
carTrunk.writeSync(0);

checkToken = (token) => {
	let result = false;
	if(token === localToken) result = true;
	return result;
	}

router.post('/lock', (req, res, next) => {
	console.log("lock car received");
	var accessGranted = checkToken(req.body.token);
	if(accessGranted) {
		carLock.writeSync(1);
		setTimeout(() => {
			carLock.writeSync(0);
		}, 1000);
		res.sendStatus(200);
		}
	else {
		res.sendStatus(401);
		}
	});
	
	
router.post('/unlock', (req, res, next) => {
	console.log("unlock car received");
	var accessGranted = checkToken(req.body.token);
	if(accessGranted) {
	carUnlock.writeSync(1);
	setTimeout(() => {
		carUnlock.writeSync(0);
		}, 1000);
		res.sendStatus(200);
		}
	else {
		res.sendStatus(401);
		}
	});	
	

router.post('/trunk', (req, res, next) => {
	console.log("trunk received");
	var accessGranted = checkToken(req.body.token);
	if(accessGranted) {
		carTrunk.writeSync(1);
	setTimeout(() => {
		carTrunk.writeSync(0);
		}, 1000);
	 	res.sendStatus(200);
		}
	else {
		res.sendStatus(401);
		}
	});
	
	
router.post('/windows', (req, res, next) => {
	console.log("windows received");
	var accessGranted = checkToken(req.body.token);
	if(accessGranted) {
		carUnlock.writeSync(1);
	setTimeout(() => {
		carUnlock.writeSync(0);
		res.sendStatus(200);
		}, 6000);
		}
	else {
		res.sendStatus(401);
		}
	});
	
return router;

}
