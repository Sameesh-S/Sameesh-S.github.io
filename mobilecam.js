function startRecording(){
    console.log("inside start Recording");
}

function startStreaming(){
    console.log("start streaming");
}

function populateDropDown(devices){
    console.log("inside populate devices");
}

function checkforDevices(){
    console.log("inside check devices");
    //enumarate through devices and set it on dropdowns::
    navigator.mediaDevices.enumerateDevices()
        .then(function(devices){
            devices.forEach(function(device){
                console.log(JSON.stringify(device, null, 4));
                alert(JSON.stringify(device, null, 4));
            });
        }).catch(function(err){
            alert("Device detection failed: " + err);
        });
}


$(document).ready(function(){
    checkforDevices();
    console.log("Document is ready event fired");
})