var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("modalImage");
var span = document.getElementsByClassName("close")[0];

function enlargeImage(imgSrc) {
  modal.style.display = "block";
  modalImg.src = imgSrc;
}

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
