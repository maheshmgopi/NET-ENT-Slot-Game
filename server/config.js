/** te game app config paramaters are declared here */

gameConfig = {
        slots: 3,
        defaultBonus:2,
        slotDelays:[1000, 500, 700],
        messagesAndSoundTracks: {
            0:{ msg: 'Big Win!',
            sound:''
            },
            1:{
                msg:'Small Win!',
                sound:''
            },
            2:{
               
                msg:'No Win',
                sound:''
            }
        },
        numberOfFruits:6
    }


module.exports = { 
    gameConfig
}