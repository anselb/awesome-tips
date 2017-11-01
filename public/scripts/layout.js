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
});
