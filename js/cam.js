(function() {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  function startup() {
    video = document.getElementById('video');
   // video.style.display = 'none';//this will disable the privew display
    canvas = document.getElementById('canvas');
   canvas.style.display = 'none';
    photo = document.getElementById('photo');
    
    startbutton = document.getElementById('startbutton');

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
      
        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
      
        if (isNaN(height)) {
          height = width / (4/3);
        }
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);
    
    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);
    var data = canvas.toDataURL('image/png');
    
    photo.setAttribute('src', data);
  }
  
  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takepicture() {
    var context = canvas.getContext('2d');
    console.log("Context: "+ context);
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
      var data = canvas.toDataURL('image/jpeg');
     // console.log(data);
      str = data.substring(data.indexOf(",") + 1);
      console.log(" Base 64 Length : "+ str.length);
      //console.log("Type : "+ typeOf(data));
      var img = {};
      img["bytea"] = data;
      //console.log("JSON data : "+JSON.stringify(img));      
      $.ajax({
    	  url: 'ImageSave',
    	  type: 'POST',
    	  data: {"image":str.trim()}
      })  
      photo.setAttribute('src', data);
      //after setting attribute detect faces
      $('#photo').faceDetection({
          complete: function (faces) {
              //console.log( JSON.stringify(faces) );
              if (faces.length > 0){
            	  let face1 = faces[0];
            	  console.log("first face : "+ JSON.stringify(face1));
            	  let width = face1["width"];
            	  let height = face1["height"];
            	  let x = face1["x"];
            	  let y = face1["y"];
            	  console.log("X : "+ face1["x"]);
            	  console.log("Y : "+ face1["y"]);
            	  console.log("width : "+ face1["width"]);
            	  console.log("height : "+ face1["height"]);
            	  //drow a rect over canvas
                  canvas = document.getElementById('canvas');
                  var ctx=canvas.getContext("2d");
                  ctx.rect(x,y,width,height);
                  ctx.strokeStyle="green";
                  ctx.stroke();
              }
          }
      });

    } else {
      clearphoto();
    }
  }
  
  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
})();
