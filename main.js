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
    let url;
    console.log('key:', key);
    console.log('faces:', faces, ', faces.length:', faces.length);
    if (faces.length === 0) { // if the faces array is empty
      console.log('detecting on pic 1');
      url = $('#url1').val();
      $('#pic1').prop('disabled', 'true');
      console.log('url1:', url)
    } else {
      console.log('detecting on pic 2');
      url = $('#url2').val();
      $('#pic2').prop('disabled', 'true');
      console.log('url2:', url)
    }

    $('#pictures').empty().append( $('<img>').attr('src', url) );

    $.ajax( paramForDetect(url) )
    .done(function(data) {
      let newFaceIds = [];
      data.forEach((person) => {
        console.log('person:', person);
        console.log('faceId:', person.faceId);
        faces.push(person);
        newFaceIds.push($('<tr>').append( $('<td>').text(person.faceId) ));
        console.log('faces array:', faces);
      });
      $('#faceIds').append(newFaceIds).show();
    })
    .fail(function(err) {
      console.log(err);
      console.log('Detect-Faces Failed');
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

  function verifyFace(faceId1, faceId2) {
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
