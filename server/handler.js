const config = require('./config');
var randomInt = require('random-int');
/* 
* Sends tje initial configuration required for the app to run
* @param {req} request object
* @param {reresponses} requestresponse object
*/
function getInitialConfig(request, response) {
    let configObj = {
        slotDelays: config.gameConfig.slotDelays,
        messagesAndSoundTracks: config.gameConfig.messagesAndSoundTracks,
        slotArrange: getSlotIndices()

    };
    response.json(configObj);
}

/*
* The result is caluculated with this method. A random number is generated with random-int and sent to the front end
* @param {req} request object
* @param {response} requestresponse object
 */
function getResult(request, response) {
    const result = {
        win: [],
        bonusRound: null
    },
        bonus = config.gameConfig.defaultBonus,
        slots = config.gameConfig.slots,
        numberOfItems = config.gameConfig.numberOfFruits;

    let bonusRound;

    for (let i = 0; i < slots; i++) {
        result.win.push(randomInt(5));
    }

    bonusRound = Math.floor(randomInt(5));

    result.bonusRound = (bonusRound == bonus);

    response.json(result);
}

/**
 * This method generates an array of three randomly generated numbers. 
 * This array is used to give default order to the fruits in different columns.
 */
function getSlotIndices() {
    var indicesArray = [randomInt(5),
    randomInt(5),
    randomInt(5)];
    var isAllEqual = !!indicesArray.reduce(function (a, b) { return (a === b) ? a : NaN; });
    if (isAllEqual) {
        getSlotIndices();
    }
    else {
        return indicesArray;
    }
}

module.exports = {
    getInitialConfig,
    getResult
};