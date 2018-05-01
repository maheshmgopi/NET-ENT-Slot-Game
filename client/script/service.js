/**All web services are routed through this module. */

;
(function(args){
'use strict'

document.addEventListener('DOMContentLoaded', function(){

   function Service(){
    this.getInitialConfig = getInitialConfig;
    this.getResult = getResult;
   }
   function getResult(successCallBack, errorCallBack){
    Util.ajax(Util.constants.getResult,successCallBack, errorCallBack )
   }
    function getInitialConfig(successCallBack, errorCallBack){
        Util.ajax(Util.constants.getInitialConfigURL,successCallBack, errorCallBack )
    }

   args['Service'] =   args['Service']  || Service;

})

})(window)