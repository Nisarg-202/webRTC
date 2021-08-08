// // SOCKET RELATED THINGS

// let socket = io("/");

// socket.on("connect", function () {
//   socket.emit("user", { uuid: uuidv4() });
// });

// socket.on("disconnect", function () {
//   console.log("Client disconnect");
// });

// document.querySelector("button").addEventListener("click", function () {
//   const CodeValue = document.querySelector("input").value;
//   socket.emit("caller-code", CodeValue);
// });

// let secondUser;
// let peerConnection = new RTCPeerConnection();

// socket.on("user-connection", function ({ id }) {
//   secondUser = id;
//   console.log("User with id = ", id, " have made a request");
//   socket.emit("user-connection", { id });
// });

// socket.on("user-connection-1", function (id) {
//   secondUser = id;
//   console.log("User with id = ", id, " have made a request");
//   openConnection();
// });

// socket.on("user-connection-offer", async function ({ offer, id }) {
//   takeConnection(offer, id);
// });

// socket.on("caller-answer", async function ({ id, answer }) {
//   await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//   startMedia();
// });

// function startMedia() {
//   navigator.mediaDevices
//     .getUserMedia({ audio: true, video: true })
//     .then(function (stream) {
//       let video = document.querySelector(".video");
//       video.srcObject = stream;
//       video.addEventListener("loadedmetadata", function () {
//         video.play();
//       });

//       stream.getTracks().forEach(function (track) {
//         peerConnection.addTrack(track, stream);
//         // peerConnection.ontrack = function ({ streams: [stream1] }) {
//         //   console.log("Hello-1");
//         //   const video1 = document.querySelector(".video-1");
//         //   video1.srcObject = stream1;
//         //   video1.addEventListener("loadedmetadata", function () {
//         //     video1.play();
//         //   });
//         // };
//       });
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// }

// async function openConnection() {
//   const offer = await peerConnection.createOffer();
//   await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
//   peerConnection.addIceCandidate();
//   socket.emit("call-user", { to: secondUser, offer });
// }

// async function takeConnection(offer, id) {
//   await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
//   const answer = await peerConnection.createAnswer();
//   await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

//   socket.emit("call-answer", { id, answer });
// }

// let socket = io("/");

// socket.on("connect", function () {
//   socket.emit("user", { peerId: peer });
// });

// socket.on("disconnect", function () {
//   console.log("Client disconnect");
// });

let conn;
let localStream;
const peer = new Peer(uuidv4());

peer.on("open", function (id) {
  console.log(id);
  document.querySelector("h4").textContent = "Your code is " + id;
});

document.querySelector("button").addEventListener("click", function () {
  const CodeValue = document.querySelector("input").value;
  let call = peer.call(CodeValue, localStream);
  call.answer(localStream);
  call.on("stream", function (stream) {
    let video1 = document.querySelector(".video-1");
    video1.srcObject = stream;
    video1.addEventListener("loadedmetadata", function () {
      video1.play();
    });
  });
  // conn = peer.connect(CodeValue);
  // conn.on("open", function () {
  //   conn.send("Hello I am nisarg");
  // });

  // conn.on("data", function (data) {
  //   console.log(data);
  // });
});

peer.on("call", function (call) {
  call.answer(localStream);
  call.on("stream", function (stream) {
    let video1 = document.querySelector(".video-1");
    video1.srcObject = stream;
    video1.addEventListener("loadedmetadata", function () {
      video1.play();
    });
  });
});

// peer.on("connection", function (con) {
//   con.on("data", function (data) {
//     console.log(data);
//   });

//   con.on("open", function () {
//     con.send("This is a acknowledgement");
//   });
// });

navigator.mediaDevices
  .getUserMedia({ audio: true, video: true })
  .then(function (stream) {
    let video = document.querySelector(".video");
    localStream = stream;
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", function () {
      video.play();
    });
  })
  .catch(function (err) {
    console.log(err);
  });
