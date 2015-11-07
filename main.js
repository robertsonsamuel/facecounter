'use strict';

$(document).ready(function() {

  $('#a-button').click(() => {
    getFaceData('http://www.dailystormer.com/wp-content/uploads/2015/07/Happy-White-People-5.jpg');
  });

  function getFaceData(url) {
    console.log("working");
    var imageParams = {
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
//fae4157b-a984-4bbf-aab3-b93e5d250efa


//http://www.dailystormer.com/wp-content/uploads/2015/07/Happy-White-People-5.jpg
//1a0f398494894081a01dc4f9fc60d690
