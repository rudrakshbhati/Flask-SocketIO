
$(document).ready(function() {
    var socket = {}
    var user_name = ""

    $(".chat_box").append("<div id = 'r_message' ><ul id='messages'></ul></div>")

    $(".chat_box").append("<div id = 'type_area' >\
        <div id = 'for_user_name'>\
                <input type='text' class = 'user_input' id='user_name' placeholder='User Name'>\
                <button id='send_name'><i class='fa fa-arrow-circle-right'></i></button>\
            </div>\
            <div id = 'for_user_msg' class = 'user_input' style = 'visibility:hidden' >\
                <input type='text' id='my_message' placeholder='Message'>\
                <button id='send_button'> <i class='fa fa-arrow-circle-right'></i></button>\
            </div>\
        </div")
        
    $('#send_name').on('click', function() {
        user_name = $('#user_name').val()
        if(user_name == ""){
            alert('User Name can not be left blank');
            return
        }
        $('#user_name').prop('readonly', true);
        // here add local ip4 address of server so that it can run on different machines (x.x.x.x:5000)
        socket =  io.connect('http://0.0.0.0:5000')
        socket.on('connect', function() {
            socket.send('User has connected!');
        });

        $("#for_user_name").css('visibility' , "hidden")
        $("#for_user_msg").css('visibility' , "visible")

        socket.on('message', function(msg) {
            $("#messages").append('<li>'+msg+'</li>');
        });
    })
    $('#send_button').on('click', function() {
        var my_message = $('#my_message').val() 
        socket.send(user_name +" : "+ my_message);
        $('#my_message').val('');
    });

    $(".user_input").keyup(function(event) {
        if (event.keyCode === 13) {
            var id = $(this).attr('id');
            if(id == "user_name" ){
                $("#send_name").click();
            }
            else{
                $("#send_button").click();
            }
        }
    });
});

