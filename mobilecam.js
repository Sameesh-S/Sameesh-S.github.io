function startRecording(){
    console.log("inside start Recording");
}

function startStreaming(){
    console.log("start streaming");
}

function populateDropDown(dropDown, devices){
   for(var i = 0; i < devices.length; i++) {
        var option = document.createElement('option');
        option.text = devices[i].kind + (i+1) + devices[i].label;
        option.value = devices[i].deviceId;
        dropDown.add(option, 0);
    }
}

function checkforDevices(){
    console.log("inside check devices");
    //enumarate through devices and set it on dropdowns::
    let camaras = [];
    let audios = [];
    navigator.mediaDevices.enumerateDevices()
        .then(function(devices){
            devices.forEach(function(device){
                if (device.kind === 'audioinput') audios.push(device); 
                if (device.kind === 'videoinput') camaras.push(device);
            });
            populateDropDown( document.getElementById("videoDevices"), camaras);
            populateDropDown( document.getElementById("audioDevices"), audios);
        }).catch(function(err){
            alert("Device detection failed: " + err);
        });
}


$(document).ready(function(){
    checkforDevices();
})