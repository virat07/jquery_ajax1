$(document).ready(function () {
  var check = localStorage.getItem('Artist');
  if (!check) {
    $("#usermsg").html('<h2>Hi new user</h2>');
    $('#loader').hide();
    
  }
  else {
    display();
    $('#usermsg').hide();   
    $("loader").hide();
  }

  $("#mySearch").on('keyup', function (e) {
    var username = $("#mySearch").val();
    if (username == '') {
      $('#wrapper').css({ 'display': 'none' });
      $('#previousData').show();
    }
    else {
      timer(username);
      setTimeout(timer, 2000);
    }
  });

});
function timer(username){
  $("#loader").show();
  var regex = new RegExp("^[a-zA-Z0-9_ ]*$");
  if (!regex.test(username)) {
    alert("dont add special character");
    return false;
  }
  else {
    requestXhr(username);
    $('#loader').hide();
  }
  $('#wrapper').css({ 'display': 'grid' });

}

function requestXhr(username) {
  var requri = 'https://rest.bandsintown.com/artists/' + username + '?app_id="bharat"';
  var repouri = 'https://rest.bandsintown.com/artists/' + username + '/events?app_id="bharat"';
  requestJson(requri, function (json) {
    var dp = json.thumb_url;
    var fullname = json.name;
    var tracker = json.tracker_count;
    var fb_link = json.facebook_page_url
    if (fullname == undefined) { fullname = username; }
    var outhtml = '<div style=" border-style: groove;">' + '<img style=" border-style: groove;" src="' + dp + '">' + '<p class ="name">' + fullname + ' ' + '<span >' + '<a id="link" class = "fa fa-facebook" target="_blank" href=' + username.facebook_page_url + '>' + '</a>' + '</span>' + '</p>' +

      '<p class="tracker">' + tracker + ' Trackers' + '</p>' +
      '</div>';
    $('#artist').html(outhtml);
    StoreToLocal(dp, fullname, tracker, fb_link);
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
   
    } 

  });
}
function requestJson(url, callback) {
  $.ajax({
    url: url,
    complete: function (xhr, txt_status) {
      if (xhr.status == 200) {
        callback.call(null, xhr.responseJSON);
      }

      else {
        alert('error');
        $('#wrapper').html("<h2> PLS TRY AGAIN</h2>");
        $('#loader').hide();
      }
    }, setTimeout: 3000
  });
}


function StoreToLocal(dp, fullname, tracker, fb_link) {
  localStorage.setItem('Artist', fullname);
  localStorage.setItem('dp', dp);
  localStorage.setItem('trackers', tracker);
  localStorage.setItem('fbLink', fb_link);  
  $("#previousData").css({'display':'none'});
}
function display() {
  var disp = localStorage.getItem("Artist");
  var dp = localStorage.getItem('dp');
  var tracker = localStorage.getItem('trackers');
  var fb = localStorage.getItem('fbLink');
  $('#previousData').html('<div>'+"Previous Searches" + '<img style=" border-style: groove;" src="' + dp + '">' + '<p class ="name">' + disp + ' ' + '<span >' + '<a id="link" class = "fa fa-facebook" target="_blank" href=' + fb + '>' + '</a>' + '</span>' + '</p>' +

  '<p class="tracker">' + tracker + ' Trackers' + '</p>' +
  '</div>');

}

function show() {
  $("#loader").css({ 'display': 'block' });
}
function hide() {
  $('#loader').css({ 'display': 'none' });
}

