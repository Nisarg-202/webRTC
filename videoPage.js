let conn;
let localStream;
const peer = new Peer(uuidv4());

peer.on("open", function (id) {
  document.querySelector("h4").textContent = "Your code is " + id;
});

document.querySelector("button").addEventListener("click", function () {
  const CodeValue = document.querySelector("input").value;
  let call = peer.call(CodeValue, localStream);
  call.answer(localStream);
  call.on("stream", function (stream) {
    let obj = document.getElementById(call.peer);
    if (!obj) {
      let newObj = document.createElement("video");
      newObj.setAttribute("id", call.peer);
      newObj.style.height = "200px";
      newObj.style.width = "200px";
      newObj.srcObject = stream;
      newObj.addEventListener("loadedmetadata", function () {
        newObj.play();
      });
      document.querySelector(".all-videos").append(newObj);
    }
  });
});

peer.on("call", function (call) {
  call.answer(localStream);
  call.on("stream", function (stream) {
    let obj = document.getElementById(call.peer);
    if (!obj) {
      let newObj = document.createElement("video");
      newObj.setAttribute("id", call.peer);
      newObj.style.height = "200px";
      newObj.style.width = "200px";
      newObj.srcObject = stream;
      newObj.addEventListener("loadedmetadata", function () {
        newObj.play();
      });
      document.querySelector(".all-videos").append(newObj);
    }
  });
});

navigator.mediaDevices
  .getUserMedia({
    audio: { echoCancellation: true },
    video: { echoCancellation: true },
  })
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
