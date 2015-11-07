'use strict';

$(document).ready(function() {

  $('#a-button').click(getFaceData);

  function getFaceData() {
    var imageParams = {
           // Request parameters
           "analyzesFaceLandmarks": "false",
           "analyzesAge": "true",
           "analyzesGender": "true",
           "analyzesHeadPose": "false",
       };

       $.ajax({
         url: 'https://api.projectoxford.ai/face/v0/detections&' + $.param(imageParams),
         beforeSend:
         type: 'default GET (Other values: POST)',
         dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
         data: {param1: 'value1'}
       })
       .done(function() {
         console.log("success");
       })
       .fail(function() {
         console.log("error");
       })
       .always(function() {
         console.log("complete");
       });


  }




});
