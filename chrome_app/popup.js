

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




// https://ionjdimigfhghpninocfnfbhohdnhglh.chromiumapp.org/

document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl(function(url) {});
    chrome.storage.sync.get("token", function(access_token){
        console.log("token now:", access_token.token); 
        if (access_token.token) {
            $("#login").attr('value', 'Logout');
        } else {
            $("#login").attr('value', 'Login!'); 
        }
    }); 
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
                            console.log(this.responseText.term); 
                            $("#newest_term").attr('value', this.responseText.term);
                            document.getElementById("newest_def").innerHTML = this.responseText.definition; 
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




//https://api.quizlet.com/2.0/sets/191545616/terms
//191545616

// chrome.tabs.executeScript( {
//    code: "window.getSelection().toString();"
//  }, function(selection) {
//    console.log(selection);
// });

// var a = vb(); 
// window.onload = a.onload();













