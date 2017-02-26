

function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}


// var vb = function() {
//   'use strict'; 
  
//   var user_id; 

//   var tokenFetcher = function () {
//     var client_id = "e4PPjEWjHf"; 
//     var state = "random";;
//     var client_secret = ""
//     var url = "https://quizlet.com/authorize?response_type=code" +
//         "&client_id=" + client_id +
//         "&scope=read%20write_set&" +
//         "state=" + state; 
//     var code; 
//     access_token = null; 

//     return {
//           getToken: function(interactive, callback) {
//               // In case we already have an access_token cached, simply return it.
//                 if (access_token) {
//                     console.log("STOP"); 
//                     callback(null, access_token);
//                     return;
//                 }
        
//             chrome.identity.launchWebAuthFlow(
//               {'url': url, 'interactive': true},
//               function(redirect_url) { 
//                 if (chrome.runtime.lastError) {
//                     callback(new Error(chrome.runtime.lastError));
//                     return;
//                 }
//                 console.log(redirect_url); 
//                 code = redirect_url.split('code=')[1]; 
//               console.log(code); 
//               exchangeCodeForToken(code); 
//              });

//             function exchangeCodeForToken(code) {
//               console.log(window.location.href); 
//               var xhr = new XMLHttpRequest();
//               xhr.open('POST', 'https://api.quizlet.com/oauth/token');
//               xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
//               xhr.setRequestHeader('Authorization', 'Basic ZTRQUGpFV2pIZjpTRHprNVF4dFNBcHFRRlQ5Q3NLV2Rl');
//               xhr.onload = function () {
//                     if (this.status === 200) {
//                       console.log(this.responseText); 

//                       var parse = JSON.parse(this.responseText); 
//                       var token = parse.access_token; 

//                       console.log(token); 
//                       setAccessToken(token); 

//                       }
//                 };
//                 var params = "grant_type=authorization_code&code=" + code + 
//                       "&redirect_uri=https://ionjdimigfhghpninocfnfbhohdnhglh.chromiumapp.org/";
//                 console.log(params); 
//                 xhr.send(params);
//             }; 

//             function setAccessToken(token) {
//                   access_token = token;
//                   callback(null, access_token);
//                 }
//           }, //getToken


//       removeCachedToken: function(token_to_remove) {
//             if (access_token == token_to_remove)
//               access_token = null;
//         },

//     } //return
//   }; // tokenFetcher


//   // console.log("GOO");
//   // tokenFetcher.getToken(function(error, access_token) {
//   //  console.log(access_token);
//   //  console.log(error); 
//   // });

//   return {
//       onload: function() {
//         console.log("here"); 
//         var b = tokenFetcher(); 
//         b.getToken(true, function(error, acc_token) {
//           console.log(acc_token);
//           console.log(error); 
//           console.log(access_token); 
//           // if (error === null) {
//           //   sendTerms(); 
//           // }
//         });

//         // function sendTerms() {
//         //   $.ajax({
//         //       type: "POST",
//         //       contentType: "application/json; charset=UTF-8",
//         //       headers: {
//         //       "Authorization": "Bearer " + access_token
//         //     },
//         //       data: JSON.stringify({
//         //           "term": "cuatro",
//         //           "definition": "four"
//         //       }),
//         //       url: "https://api.quizlet.com/2.0/sets/191545616/terms",
//         //       success : function(data) {
//         //         console.log(data); 
//         //       },
//         //       error : function(response) {
//         //         console.log(response); 
//         //       }
//         //   });
//         //}
//     }
//    } 
// }; 




// https://ionjdimigfhghpninocfnfbhohdnhglh.chromiumapp.org/

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {});
  document.getElementById("send").addEventListener("click", learn);
});

function learn() {
    chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
        }, function(selection) {
            console.log(selection); 
            if (selection !== null) {
                var term = selection[0];
                var definition = "something"; 
                chrome.storage.sync.get("token", function(access_token){
                    console.log(access_token.token); 
                    // $.ajax({
                    //     type: "POST",
                    //     contentType: "application/json; charset=UTF-8",
                    //     headers: {
                    //     "Authorization: Bearer ": access_token
                    //   },
                    //     data: JSON.stringify({
                    //         "term": term,
                    //         "definition": definition
                    //     }),
                    //     url: "https://api.quizlet.com/2.0/sets/191545616/terms",
                    //     success : function(data) {
                    //       console.log(data); 
                    //     },
                    //     error : function(response) {
                    //       console.log(response); 
                    //     }
                    // });
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', 'https://api.quizlet.com/2.0/sets/191545616/terms');
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                    //xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
                    xhr.onload = function () {
                        if (this.status === 200) {
                            console.log(this.responseText); 
                        }
                        console.log(this.responseText); 
                    };
                    var params = "term=" + term + 
                                "&definition=" + definition + 
                                "&access_token=" + access_token.token;
                    console.log(params); 
                    xhr.send(params);
                }); 
            }
        }); 
}



    // chrome.tabs.executeScript( {
    //     code: "window.getSelection().toString();"
    // }, function(selection) {
    //     var term = selection[0];
    //     var definition = "something";
    //     console.log(term); 
    //     $.ajax({
    //           type: "POST",
    //           contentType: "application/json; charset=UTF-8",
    //           headers: {
    //           "Authorization": "Bearer " + access_token
    //         },
    //           data: JSON.stringify({
    //               "term": term,
    //               "definition": definition
    //           }),
    //           url: "https://api.quizlet.com/2.0/sets/191545616/terms",
    //           success : function(data) {
    //             console.log(data); 
    //           },
    //           error : function(response) {
    //             console.log(response); 
    //           }
    //       });  
    // });
//});


//https://api.quizlet.com/2.0/sets/191545616/terms
//191545616

// chrome.tabs.executeScript( {
//    code: "window.getSelection().toString();"
//  }, function(selection) {
//    console.log(selection);
// });

// var a = vb(); 
// window.onload = a.onload();













