'use strict';

$(document).ready(function() {

  let url1 = 'http://i.imgur.com/XwZbreml.jpg';
  let url2 = 'http://i.imgur.com/JaOEjv3l.jpg';

  let key = "1a0f398494894081a01dc4f9fc60d690";
  let faces = [];
  let imageParams = {
    // Request parameters
    "analyzesFaceLandmarks": "false",
    "analyzesAge": "true",
    "analyzesGender": "true",
    "analyzesHeadPose": "true"
  };

  $('#detect').click(detectFaces);
  $('#verify').click(verifyFace);

  function detectFaces() {
    let jqxhr1 = $.ajax( paramForDetect(url1) );
    let jqxhr2 = $.ajax( paramForDetect(url2) );

    $.when(jqxhr1, jqxhr2).done(function(jqxhr1, jqxhr2) {
      let faces1 = jqxhr1[0];
      let faces2 = jqxhr2[0];
      console.log(faces1);
      console.log(faces2);
    });
  };

  function paramForDetect(url) {
    return {
      url: 'https://api.projectoxford.ai/face/v0/detections?' + $.param(imageParams),
      beforeSend: function(xhrObj){
        // Request headers
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", key);
      },
      type: 'POST',
      data: `{'url': '${url}'}`
    };
  }

  function verifyFace() {
    let faceId1 = "8efb19d0-62f0-43fc-a0d6-195a91c09c36"; // Sam 1
    let faceId2 = "1d992fb4-cbb0-4142-b708-3cfac038bfa6"; // Sam 2

    $.ajax( paramForVerify({"faceId1":faceId1, "faceId2":faceId2}) )
    .done(function(data) {
      console.log(data); // -> {isIdentical: true, confidence: 0.80458}
    })
  }

  function paramForVerify(faceIds) {
    return {
      url: 'https://api.projectoxford.ai/face/v0/verifications',
      beforeSend: function(xhrObj){
        // Request headers
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", key);
      },
      type: 'POST',
      data: JSON.stringify(faceIds)
    };
  }





});

//fae4157b-a984-4bbf-aab3-b93e5d250efa
//1a0f398494894081a01dc4f9fc60d690
