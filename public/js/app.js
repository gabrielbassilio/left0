$(function (){ 
    $('#getTopics').on('click', function(){
        $.ajax({
            url: '/test',
            success: function(topics){
                method:'get';
                console.log(topics);
            }
        });
    });
});