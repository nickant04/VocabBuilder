var vb = function() {
	'use strict'; 

	var access_token; 
	var user_id; 

	var tokenFetcher = function () {
		var client_id = "e4PPjEWjHf"; 
		var state = "random";;
		var client_secret = ""
		var url = "https://quizlet.com/authorize?response_type=code" +
				"&client_id=" + client_id +
				"&scope=read%20write_set&" +
				"state=" + state; 
		var code; 
		access_token = null; 

		return {
      		getToken: function(interactive, callback) {
        	// In case we already have an access_token cached, simply return it.
       			if (access_token) {
          			callback(null, access_token);
          			return;
        		}
		
				chrome.identity.launchWebAuthFlow(
				  {'url': url, 'interactive': true},
				  function(redirect_url) { 
				  	// if (chrome.runtime.lastError) {
				   //      callback(new Error(chrome.runtime.lastError));
				   //      return;
				   //  }
				  	console.log(redirect_url); 
				  	code = redirect_url.split('code=')[1]; 
					console.log(code); 
					exchangeCodeForToken(code); 
				 });

				function exchangeCodeForToken(code) {
					console.log(window.location.href); 
					var xhr = new XMLHttpRequest();
					xhr.open('POST', 'https://api.quizlet.com/oauth/token');
					xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
					xhr.setRequestHeader('Authorization', 'Basic ZTRQUGpFV2pIZjpTRHprNVF4dFNBcHFRRlQ5Q3NLV2Rl');
					xhr.onload = function () {
				        if (this.status === 200) {
				        	console.log(this.responseText); 

				        	var parse = JSON.parse(this.responseText); 
				        	var token = parse.access_token; 

				        	console.log(token); 
				        	setAccessToken(token); 

		            	}
				   	};
				   	var params = "grant_type=authorization_code&code=" + code + 
				   				"&redirect_uri=https://ionjdimigfhghpninocfnfbhohdnhglh.chromiumapp.org/";
				   	console.log(params); 
				    xhr.send(params);
				}; 

				function setAccessToken(token) {
		        	access_token = token;
		        	chrome.storage.sync.set({'token': token}, function() {
			          // Notify that we saved.
			          console.log('Settings saved');
			        });
		        	callback(null, access_token);
		        }
			}, //getToken


			removeCachedToken: function(token_to_remove) {
		        if (access_token == token_to_remove)
		          access_token = null;
		    },

		} //return
	}; // tokenFetcher


	// console.log("GOO");
	// tokenFetcher.getToken(function(error, access_token) {
	// 	console.log(access_token);
	// 	console.log(error); 
	// });

	return {
	    onload: function() {
	    	console.log("here"); 
	    	var b = tokenFetcher(); 
		    b.getToken(true, function(error, acc_token) {
		    	console.log(acc_token);
		    	console.log(error); 
		    	console.log(access_token); 
		    	// if (error === null) {
		    	// 	sendTerms(); 
		    	// }
	    	});

	  //   	function sendTerms() {
	  //   		$.ajax({
			//         type: "POST",
			//         contentType: "application/json; charset=UTF-8",
			//         headers: {
		 //    			"Authorization": "Bearer " + access_token
		 //  			},
			//         data: JSON.stringify({
			//             "term": "cuatro",
			//             "definition": "four"
		 //        	}),
			//         url: "https://api.quizlet.com/2.0/sets/191545616/terms",
			//         success : function(data) {
			//         	console.log(data); 
			//         },
			//         error : function(response) {
			//         	console.log(response); 
			//         }
		 //    	});
			// }
		}
	 } 
}; 

//https://api.quizlet.com/2.0/sets/191545616/terms
//191545616

// chrome.tabs.executeScript( {
// 	  code: "window.getSelection().toString();"
// 	}, function(selection) {
// 	  console.log(selection);
// });

var a = vb(); 
window.onload = a.onload();











