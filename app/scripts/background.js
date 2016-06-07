'use strict';

chrome.alarms.create('replace_stat',{'periodInMinutes':1})


function nextStat(callback){

    chrome.storage.sync.get(['current_list', 'current_key'], function(data){
        console.log(data);
        if(data.current_key == data.current_list.list.length){
            data.current_key = 0
        } else {
            data.current_key++;
        }
        chrome.storage.sync.set({'current_stat': data.current_list.list[data.current_key],
            'current_key': data.current_key}, function(){
                callback(data.current_list.list[data.current_key])
        });

    });
}


function sendMessageToActive(message){

    chrome.tabs.query({active: true}, function(data){
        $.each(data,function(key, tab){
            chrome.tabs.sendMessage(tab.id,{message:message});
        })
    })

}

function loadDate(){

    var gy = moment().format('YYYY');
    var gm = moment().format('MM');
    var gd = moment().format('DD');

    $.ajax(
        {url:'http://www.hebcal.com/converter/?cfg=json&gy='+ gy +'&gm='+ gm +'6&gd='+ gd +'2&g2h=1'}
    ).done(function(data){
        //save in local storage
        chrome.storage.sync.set({'hebrew_date': data.hebrew});
        chrome.alarms.create('refresh_date',{'when': moment(moment().add(1, 'd').format('YYYY MM DD')).valueOf()})

    }).fail(function(data){
        chrome.storage.sync.set({'hebrew_date': ''});
    });

    sendMessageToActive('reload')


}

/* listeners */

chrome.alarms.onAlarm.addListener(function(alarm){
    console.log(alarm);
    if(alarm.name === 'refresh_date'){
       loadDate();
    }
    if(alarm.name === 'replace_stat'){
        sendMessageToActive('reload');
    }
})

loadDate();