/* This file takes care of the animations in the game app*/

;
(function (args) {
    'use strict'

    /* crete a JS class having the methods to execute the animaiton */
    function AnimateDOM(dom, interval, animateTime, animationStopIndex, callBack) {
        this.dom = dom;
        this.interval = interval;
        this.timer;
        this.animateFruits = animateFruits;
        this.setStopIndex = setStopIndex;
        this.stopIndex = '000';
        this.animateTime = animateTime;
        this.callBack = callBack;
        activateStopTimer(animateTime, this);
        this.animationStopIndex = animationStopIndex;
    }

    /** activating the method to stop the spinning animation in each column*/
    function activateStopTimer(animateTime, refer) {
        var _this = refer;
        setTimeout(function () {
            _this.setStopIndex(_this.animationStopIndex);
        }, animateTime);
    }

    /** Spins the fruits on each column for the configured time interval */

    function animateFruits() {
        var fruits = this.dom.querySelectorAll('img');

        var _this = this;
        _this.timer = setInterval(function () {
            var currentFruit = _this.dom.querySelector('img.current');
            var exitFruit = _this.dom.querySelector('img.exit');
            if (currentFruit) {
                currentFruit.classList.add('exit');
                exitFruit?exitFruit.classList.remove('exit'):''
                currentFruit.classList.remove('current');
                var dataIndex = Number(currentFruit.getAttribute('data-index'));
                var destIndex = dataIndex - 1 < 0 ? 5 : dataIndex - 1;
                var nextFruit = _this.dom.querySelector('img[data-index="' + destIndex + '"]');
                nextFruit.classList.add('current');

               
                if (_this.stopIndex !== '000' && (_this.stopIndex == destIndex)) {
                   
                    _this.stopIndex = '000';
                    stopSpin(_this.timer, _this.callBack);
                }
            }

        }, _this.interval);
    }
    /** Sets the stop index at which the spinner should be stopped in each column */
    function setStopIndex(index) {

        this.stopIndex = index;
    }
    /** clears the time interval and the animation. calls the callback method to be executed once animation is done */
    function stopSpin(timer, callBack) {
        clearInterval(timer);
        setTimeout(function () { callBack() }, 1000);
    }

    args['AnimateDOM'] = args['AnimateDOM'] || AnimateDOM;

})(window)