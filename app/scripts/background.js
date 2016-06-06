'use strict';

chrome.alarms.create('replace_stat',{'periodInMinutes':1})

chrome.alarms.onAlarm.addListener(function(alarm){
    console.log(alarm);
    nextStat(function(new_stat){
        console.log(new_stat);
    })
})


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