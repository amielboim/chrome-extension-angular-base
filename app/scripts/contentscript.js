
$('meta').last().after("<link href='http://fonts.googleapis.com/earlyaccess/opensanshebrew.css' rel='stylesheet' type='text/css'>");


chrome.storage.sync.get('current_stat', function(data){

    // bottom menu for every page
    var bot_menu = "<div id='sh-wrapper'>";
    bot_menu += "<p>" + data.current_stat + "</p>"
    bot_menu += "</div>";

    $('body').append(bot_menu);

})