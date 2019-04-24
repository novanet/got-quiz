(function () {
    'use strict';

    angular
        .module('app', [])
        .controller('controller', controller)
        .factory('dataservice', dataservice);

    controller.$inject = ['dataservice'];
    dataservice.$inject = ['$q', '$http'];

    function controller(dataservice) {
        var vm = this;
        vm.answer = {};
        vm.displayPoints = true;
		vm.error = null;
	    vm.toggleDisplay = toggleDisplay;

		dataservice.getAnswers()
            .then(function(result){
                vm.answers = result;
            });		

		dataservice.getCharacters()
            .then(function(result){
                vm.characters = result;
            });			
			
		function toggleDisplay(){
			vm.displayPoints = !vm.displayPoints;
		}
    }	 

    function dataservice($q, $http) {
        return {
			getAnswers: _.once(getAnswers),
			getCharacters: _.once(getCharacters)
        }
		function getAnswers() {
            return $q(function (resolve, reject) {
                $http.get('https://novanet-got-quiz-api.azurewebsites.net/api/answers')
                    .then(function (response) {
                        resolve(response.data);
                    });
            });
        } 
		function getCharacters() {
            return $q(function (resolve, reject) {
                $http.get('https://novanet-got-quiz-api.azurewebsites.net/api/characters')
                    .then(function (response) {
                        resolve(response.data);
                    });
            });
        }  		
    }    
})();