$(function () {
    var page = 1,
        pageLimit = 10,
        totalRecord = 0;
   function GetAll() {
        var outlook = '';
        $.ajax({
            url: "http://www.json-generator.com/api/json/get/cfFCjCzUHS?indent=2",
            type: 'GET',
            success: function (data) {
                var user = data.book;
                for (var i = 0; i < user.length; i++) {
                    outlook += "<div class='row'>";
                    outlook += "<div class='column'>" + user[i].name + "</div>";
                    outlook += "<div class = 'column'>" + user[i].description + "</div>";
                    outlook += "<div class='column'>" + user[i].category + "</div>";
                    outlook += "</div>";
                }
                $('#base').html(outlook);
                console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrow) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrow);
            }
        });
    }
 
    $('#List').on('click', function (event) {
        var user = event.target.id;
        console.log(user);
        if(user === 'All'){
            user=' ';
            GetAll();

        }
        else{

        var outlook = ' ';  
        $.ajax({
            url: "http://www.json-generator.com/api/json/get/cfFCjCzUHS?indent=2",
            type: 'GET',
            success: function (data) {
                var up_user = data.book;
                for (var i = 0; i < up_user.length; i++) {
                    if(up_user[i].category === user){
                    outlook += "<div class='row'>";
                    outlook += "<div class='column'>" + up_user[i].name + "</div>";
                    outlook += "<div class = 'column'>" + up_user[i].description + "</div>";
                    outlook += "<div class='column'>" + up_user[i].category + "</div>";
                    outlook += "</div>";
                }
                    
            }
                $('#base').html(outlook);
          
            },
            error: function (jqXHR, textStatus, errorThrow) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrow);
            }
        });
    
    }
    });

});