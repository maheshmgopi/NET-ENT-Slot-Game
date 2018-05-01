/** The root module of the application. */

;
(function () {
    'use strict'

    document.addEventListener('DOMContentLoaded', function () {
        var gameElement = document.querySelector('.game'),
            playButton = gameElement.querySelector('.play-button'),
            slots = gameElement.querySelectorAll('.slot-wheel'),
            fruitsContainer = gameElement.querySelector('.fruits-container'),
            playBackCounter = 1,
            service,
            resultArray = [],
            bonusRound = false,
            message = gameElement.querySelector('.message'),
            spinAudio = document.querySelector('.spin-audio'),
            bigWinAudio = document.querySelector('.big-win-audio');

        /** Fetches the initial configurations(the fruits default arrangement, 
         * time upto which the fruits should be spinned, 
         * the messages)from the server */
        function getInitiaConfig() {
            service.getInitialConfig(getInitialConfigSuccess);
        }

        /** The success method fired when the initial config is received */
        function getInitialConfigSuccess(response) {
            response = Util.parseJSON(response);
            Util.constants.slotDelays = response.slotDelays;
            Util.constants.messagesAndSoundTracks = response.messagesAndSoundTracks;
            for (var i = 0; i < slots.length; i++) {
                slots[i].querySelectorAll('img')[response.slotArrange[i]].classList.add('current');
            }
            fruitsContainer.classList.add('open');
        }

        /** attaching the click event to the play button */
        function attachEvent() {
            playButton.addEventListener('click', onPlayButtonClick);
        }

        /**Listner for the play button click. calls the result service. */
        function onPlayButtonClick(event) {
            resetSound()
            playSound('spin');
            var animateArray = [];
            this.setAttribute("disabled", 'disabled');
            service.getResult(getResultSuccess);
            if (!bonusRound)
                resetMessage();
        }

        /** Triggered when the result service returns success. */
        function getResultSuccess(response) {
            response = Util.parseJSON(response);
            resultArray = response.win;
            bonusRound = response.bonusRound;
            for (var i = 0; i < slots.length; i++) {
                slots[i].setAttribute('delay', Util.constants.slotDelays[i])
                var animate = new AnimateDOM(slots[i], 200, Util.constants.slotDelays[i], response.win[i], playBack);
                animate.animateFruits();
            }
        }
        /** Executed when the wheels are spun. */
        function playBack(dom) {
            if (playBackCounter === 3) {
                playButton.removeAttribute("disabled");
                playBackCounter = 1;
                resetSound();
                displayResult();
                if (bonusRound) {
                    resetMessage();
                    message.classList.add('bonus');
                    message.textContent = Util.constants.bonusMessage;
                    playButton.click();
                }

            }
            playBackCounter++;
        }
        /** the results are processed and shown */
        function displayResult() {
            var counts = {};
           
            resultArray.forEach(function (x) {
                counts[x] = (counts[x] || 0) + 1;
            });
            switch (Object.keys(counts).length) {
                case 1:
                    playSound('big-win');
                    message.classList.add('big-win');
                    break;
                case 2:
                    message.classList.add('small-win');
                    break;
                case 3:
                    message.classList.add('no-win');
                    break;
            }
            message.textContent = Util.constants.messagesAndSoundTracks[Object.keys(counts).length - 1].msg;
            setTimeout(function () { message.classList.add('active'); }, 600);

        }
        /** resetting the message element */
        function resetMessage() {
            message.classList.remove('bonus');
            message.classList.remove('active');
            message.classList.remove('small-win');
            message.classList.remove('no-win');
            message.classList.remove('big-win');
            message.textContent = '';
        }

        /** seeke audio files to initial position and pause it */
        function resetSound() {
            bigWinAudio.currentTime = 0;
            spinAudio.currentTime = 0;
            bigWinAudio.pause();
            spinAudio.pause();

        }

         /** Play the needed sounds*/
        function playSound(type) {
            if (type == 'spin') {
                spinAudio.play();
            } else if (type = 'big-win') {
                bigWinAudio.play();
            }
        }


        /** initialize the app */
        function init() {
            service = new Service();
            attachEvent();
            getInitiaConfig();
        }

        init()
    })

})()