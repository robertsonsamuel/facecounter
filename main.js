'use strict';

$(document).ready(function() {

  let key;
  let faces = [];
  let imageParams = {
    // Request parameters
    "analyzesFaceLandmarks": "false",
    "analyzesAge": "true",
    "analyzesGender": "true",
    "analyzesHeadPose": "true"
  };

  $('#pic1, #pic2').click(detectFaces);


  function detectFaces() {
    key = $('#key').val();
    console.log('key:', key);
    console.log('faces:', faces, ', faces.length:', faces.length);
    if (faces.length === 0) { // if the faces array is empty
      console.log('detecting on pic 1');
      let url1 = $('#url1').val();
      console.log('url1:', url1)

      $.ajax( paramForDetect(url1) )
      .done(function(data) {
        let faceIds = $('<div>');
        data.forEach((person) => {
          console.log('person:', person);
          faces.push(person);
          console.log('faces array:', faces);
        });
      })
      .fail(function(err) {
        console.log(err);
        alert('Detect-Faces Failed');
      });
    } else {

      console.log('detecting on pic 2');
      let url2 = $('#url2').val();
      console.log('url2:', url2)
    }
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
