
$('meta').last().after("<link href='http://fonts.googleapis.com/earlyaccess/opensanshebrew.css' rel='stylesheet' type='text/css'>");


chrome.storage.sync.get(['current_stat', 'hebrew_date'], function(data){

    // bottom menu for every page
    var bot_menu = "<div id='sh-wrapper'>";
    bot_menu += "<div class='sh-col'><p></p></div>";
    bot_menu += "<div id='stat-section' class='sh-col'><p>" +data.current_stat + "</p></div>";
    bot_menu += "<div class='sh-col'><p>" + data.hebrew_date + "</p></div>";
    bot_menu += "</div>";

    $('body').append(bot_menu);

})


chrome.runtime.onMessage.addListener(function(message){
	if(message.message === 'reload'){
		 chrome.storage.sync.get('current_stat', function(data){
			 $('#sh-wrapper div#stat-section p').text(data.current_stat);
		})
	}	
})
