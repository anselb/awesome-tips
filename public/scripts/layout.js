$(document).ready(function(){

  $('#signUp').click(function(){
      $.post('/sign-up', {username : $('#username').val() , password : $('#password').val()}, function(){
          location.reload();
      });
  });

  $('#login').click(function(){
      $.post('/login', {username : $('#username').val() , password : $('#password').val()}, function(){
          location.reload();
      });
  });

  $('#logout').click(function(){
      $.post('/logout', function(req,res){
          location.reload();
      });
  });

  $('#tip-submit').click(function(){
    var lat = 0;
    var lng = 0;
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      $.post('/tips', {tipContent : $('#tip-content').val(), tipLat : lat, tipLng : lng}, function(){
        location.reload();
      });
    })
  })

});
