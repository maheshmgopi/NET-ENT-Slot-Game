/** the miscellaneous functions are defined with Util Object */

;
(function (args) {
    'use strict'
    var util = {};

    /** The constants including the service urls */
    util.constants = {
        getInitialConfigURL: 'getInitialConfig',
        getResult: 'getResult',
        slotDelays: [5000, 7000, 1000],
        messagesAndSoundTracks: {},
        winArrayMaster: [0, 1, 2, 3, 4, 5],
        bonusMessage: 'Bonus Round!!!!'
    };
    /** Method to call the web service */
    util.ajax = function (url, successCallBack, errorCallBack) {

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == (XMLHttpRequest.DONE || 4)) {
                if (xmlhttp.status == 200) {
                    successCallBack ? successCallBack(xmlhttp.responseText) : '';
                }
                else if (xmlhttp.status == 400) {
                    errorCallBack ? errorCallBack({ message: "Error. Please Try Again" }) : '';
                }
                else {
                    errorCallBack ? errorCallBack({ message: "Something Went Wrong. Please Try Again" }) : '';
                }
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    };

    /** Parse the JSON string to Object */
    util.parseJSON = function (json) {
        var result;
        try {
            result = JSON.parse(json)
        } catch (e) {
            console.log('Bad Data!');
        }

        return result
    }
    args.Util = args.Util || util;


})(window);