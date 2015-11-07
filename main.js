'use strict';

$(document).ready(function() {

  $('#a-button').click(() => {
  getFaceData('http://i.imgur.com/XwZbreml.jpg');
  });

  function getFaceData(url) {
    let faceData;
    console.log("working");
    let imageParams = {
           // Request parameters
           "analyzesFaceLandmarks": "true",
           "analyzesAge": "true",
           "analyzesGender": "true",
           "analyzesHeadPose": "true",
       };

   $.ajax({
     url: 'https://api.projectoxford.ai/face/v0/detections?' + $.param(imageParams),
     beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","1a0f398494894081a01dc4f9fc60d690");
     },
     type: 'POST',
     data: `{'url': '${url}'}`
   })
   .done(function(data) {
     faceData = data;
     //sameFace(faceData);
     console.log(faceData,"inside done fun");
   })
   .fail(function() {
     console.log("error");
   })
   .always(function() {
     console.log("complete");
   });

   //console.log(faceData,"outside done func");
   return faceData;

  }


function sameFace(faces) {
  var faceIds = {faceId1:'',faceId2:'',};
  faces.forEach(function(person){
    faceIds.push(person.faceId);
  });


}





});
//fae4157b-a984-4bbf-aab3-b93e5d250efa


//http://www.dailystormer.com/wp-content/uploads/2015/07/Happy-White-People-5.jpg
//1a0f398494894081a01dc4f9fc60d690
