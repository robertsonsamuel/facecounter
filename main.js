'use strict';

$(document).ready(function() {

  $('#a-button').click(getFaceData);

  function getFaceData() {
    console.log("working");
    var imageParams = {
           // Request parameters
           "analyzesFaceLandmarks": "false",
           "analyzesAge": "true",
           "analyzesGender": "true",
           "analyzesHeadPose": "false",
       };

       $.ajax({
         url: 'https://api.projectoxford.ai/face/v0/detections&' + $.param(imageParams),
         beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","1a0f398494894081a01dc4f9fc60d690");
         },
         type: 'POST',
         data: "http://www.totalpenishealth.com/article/wp-content/uploads/2015/01/tips.jpg"
       })
       .done(function(data) {
         console.log(data);
       })
       .fail(function() {
         console.log("error");
       })
       .always(function() {
         console.log("complete");
       });


  }




});
