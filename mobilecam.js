function startRecording(){
    console.log("inside start Recording");
}

function startStreaming(){
    const videoPreview = document.getElementById("videoPreview");
    //get the video device :: 
    let e = document.getElementById("videoDevices");
    let videoConstraints = {};
        videoConstraints.deviceId = e.options[e.selectedIndex].value;
    let constraints = {
        video: videoConstraints,
        audio: false
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            videoPreview.srcObject = stream;
        }, (err) => {
            console.log("user rejected permission");
        })
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