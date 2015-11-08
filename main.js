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

    if ($(this).attr('id') === 'pic1') {
      console.log('detecting on pic 1');
      url = $('#urlone').val();
      // $('#pic1').prop('disabled', 'true');
    } else {
      console.log('detecting on pic 2');
      url = $('#urltwo').val();
      // $('#pic2').prop('disabled', 'true');
    }

    // display the picture currently being processed in the DOM
    $('#pictures').append( $('<img>').attr('src', url) ).addClass('testImage');

    console.log('url:', url)

    // oh dear, this is callback hell...
    $.ajax( paramForDetect(url) )
    .done(function(data) {
      console.log("we've got face data:", data);

      let newFaces = [];
      let newFaceIds = [];

      data.forEach((person) => {
        // if the face is not already in our faces array, add it
        if (faces.length > 0) {
          let haveAlreadyp = verifyFace(person.faceId, faces[0].faceId);
          $.when(haveAlreadyp).then((data) => {
            console.log('haveAlreadyp result:', data.isIdentical);

            if (!data.isIdentical) {
              // update our array of known faces
              faces.push(person);
              console.log('faces array:', faces);
              // print the new face ID to the DOM
              $('#numberOfpeople').text(faces.length);
              let $row = $('<tr>').append( $('<td>').text(person.faceId) );
              $('#faceIds').append($row).show();

              // TODO: DISPLAY BOX AROUND THIS PERSON'S FACE ON TOP OF PICTURE
            }

          });
        } else {
          // update our array of known faces
          faces.push(person);
          console.log('faces array:', faces);
          $('#numberOfpeople').text(faces.length);
          // print the new face ID to the DOM
          let $row = $('<tr>').append( $('<td>').text(person.faceId) );
          $('#faceIds').append($row).show();
        }
      });

    })
    .fail(function(err) {
      console.log(err);
      console.log('Detect-Faces Failed');
    });

  }; // end detectFaces function


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
    return $.ajax( paramForVerify({"faceId1":faceId1, "faceId2":faceId2}) )
    .fail(function(err) {
      console.log(err);
      console.log('Verify-Face Failed for:', faceId1, 'vs', faceId2);
    });
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
