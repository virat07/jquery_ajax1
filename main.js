$(document).ready(function () {
 
  $("#mySearch").on('keyup', function (e) {
    var username = $("#mySearch").val();
    console.log(username);
    if (username == ' '|| username == null) {
      $('#wrapper').html("<h2>No User Info Found</h2>");

    }
    else
    {
    $("#artist,#upcoming-events").html('<div id="loader"><img src="loader.gif" alt="loading..."></div>');

    function timer() {     
      var regex = new RegExp("^[a-zA-Z0-9]+$");
      if (!regex.test(username)) {
        e.preventDefault();
        return false;
      }
     
        if (username == ' ') {
          $('#wrapper').html("<h2>No User Info Found</h2>");
        }
        else {
          requestXhr(username);
          StoreToLocal(username);
        } 
      }
      
    setTimeout(timer, 3000);
    }
  });
  $('$body').on('beforeunload',function(){
    console.log('page reloaded');
  });
});

function requestXhr(username){
  var requri = 'https://rest.bandsintown.com/artists/' + username + '?app_id="bharat"';
          var repouri = 'https://rest.bandsintown.com/artists/' + username + '/events?app_id="bharat"';
          requestJson(requri, function (json) {
            // else we have a user and we display their info
            var dp = json.thumb_url;
            var fullname = json.name;
            var tracker = json.tracker_count;
            var fb_link = json.facebook_page_url
            if (fullname == undefined) { fullname = username; }
            var outhtml = '<div style=" border-style: groove;">' + '<img style=" border-style: groove;" src="' + dp + '">' + '<p class ="name">' + fullname + ' ' + '<span >' + '<a id="link" class = "fa fa-facebook" target="_blank" href=' + username.facebook_page_url + '>' + '</a>' + '</span>' + '</p>' +

              '<p class="tracker">' + tracker + ' Trackers' + '</p>' +
              '</div>';
            $('#artist').html(outhtml);
            StoreToLocal(dp,fullname,tracker,fb_link);
            var events = '';
            $.getJSON(repouri, function (json) {
              events = json;
              outputPageContent();
            });

            function outputPageContent() {
              var outevents = '';
              if (events.length == 0) { outevents = outevents + '<p>No Upcoming Events!</p></div>'; }
              else {

                outevents = outevents + '<p><strong style="padding:34px;">Upcoming Events:</strong></p> <ul>';
                $.each(events, function (index) {
                  outevents = outevents + '<li>' + '<span class="events_123">' + events[index].venue.city + '</span>' + '<span class="events_123">' + events[index].venue.country + '</span>' + '<span class="events_123">' + events[index].venue.name + '</span>' + '</li>';
                });

              }
              

              $('#upcoming-events').html(outevents);
            } // end outputPageContent()
          });
}
function requestJson(url, callback) {
  $.ajax({
    url: url,
    complete: function (xhr, txt_status) {
      if (xhr.status == 200){        
        callback.call(null, xhr.responseJSON);
       }

      else {
        alert('error');
        $('body').html("<h2> PLS TRY AGAIN</h2>")
      }
    }, timeout: 3000
  });
}


function StoreToLocal(dp,fullname,tracker,fb_link){
   localStorage.setItem('Artist',fullname);
   localStorage.setItem('dp',dp);
   localStorage.setItem('trackers',tracker);
   localStorage.setItem('fbLink',fb_link);
   
}



// end click event handler

 // Use Microsoft XDR
/*if ($.browser.msie && window.XDomainRequest) {
    // Use Microsoft XDR
    var xdr = new XDomainRequest();
    xdr.open("get", "someurl");
    xdr.onload = function () {
    var JSON = $.parseJSON(xdr.responseText);
    if (JSON == null || typeof (JSON) == 'undefined')
    {
        JSON = $.parseJSON(data.firstChild.textContent);
    }
    processData(JSON);
    };
    xdr.onprogress = function(){ };
    xdr.ontimeout = function(){ };
    xdr.onerror = function () { };
    setTimeout(function(){
        xdr.send();
    }, 0);
  }*/
// function Storing to local storage 