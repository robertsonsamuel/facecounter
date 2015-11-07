'use strict';

$(document).ready(function() {
  let url1 = 'http://i.imgur.com/XwZbreml.jpg';
  let url2 = 'http://i.imgur.com/JaOEjv3l.jpg';
  let imageParams = {
    // Request parameters
    "analyzesFaceLandmarks": "false",
    "analyzesAge": "true",
    "analyzesGender": "true",
    "analyzesHeadPose": "true"
  };

  $('#a-button').click(() => {
    var jqxhr1 = $.ajax( paramForAJAX(url1) );
    var jqxhr2 = $.ajax( paramForAJAX(url2) );

    $.when(jqxhr1, jqxhr2).done(function(jqxhr1, jqxhr2) {
      let faces1 = jqxhr1[0];
      let faces2 = jqxhr2[0];
      console.log(faces1);
      console.log(faces2);
    });
  });

  function paramForAJAX(url) {
    return {
      url: 'https://api.projectoxford.ai/face/v0/detections?' + $.param(imageParams),
      beforeSend: function(xhrObj){
             // Request headers
             xhrObj.setRequestHeader("Content-Type","application/json");
             xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","1a0f398494894081a01dc4f9fc60d690");
      },
      type: 'POST',
      data: `{'url': '${url}'}`
    };
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
