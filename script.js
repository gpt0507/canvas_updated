let myform = document.getElementById('myform');
let targetimage = document.getElementById('targetimage');
// let targetimage = new Image();
// let canvas = document.getElementById('canvas');
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
let downloadlink = document.getElementById('downloadlink');
let inputrange = document.querySelectorAll('.slider');

// Set crossOrigin attribute to handle CORS for the image
targetimage.crossOrigin = "anonymous";

// Default image URL
targetimage.src = "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

// Load image on canvas and apply filters
targetimage.onload = function () {
  canvas.width = targetimage.width;
  canvas.height = targetimage.height;
  applyFilters();
}

// Change image based on the URL provided
myform.addEventListener('submit', function (e) {
  let urlimage = document.getElementById('onlineurl');
  let urlimageval = urlimage.value;
  if (urlimageval.length) {
    targetimage.src = urlimageval;
    urlimage.value = '';
  }
  e.preventDefault();
});

for (let i = 0; i <= inputrange.length - 1; i++) {
  inputrange[i].addEventListener('input', applyFilters);
}

function applyFilters() {
  let gs = document.getElementById('gs').value;
  let blur = document.getElementById('blur').value;
  let huerotate = document.getElementById('hue-rotate').value;
  let sepia = document.getElementById('sepia').value;
  let resize = document.getElementById('resize').value;
  let brightness = document.getElementById('brightness').value;
  let saturation = document.getElementById('saturation').value;
  let invert = document.getElementById('invert').value;

  targetimage.style.filter = `grayscale(${gs}%) blur(${blur}px) hue-rotate(${huerotate}deg) sepia(${sepia}%) brightness(${brightness}%) saturate(${saturation}%) invert(${invert}%)`;
  ctx.filter = `grayscale(${gs}%) blur(${blur}px) hue-rotate(${huerotate}deg) sepia(${sepia}%) brightness(${brightness}%) saturate(${saturation}%) invert(${invert}%)`;

  let width = targetimage.width * (resize / 100);
  let height = targetimage.height * (resize / 100);

  canvas.width = width;
  canvas.height = height;

  // Redraw the image onto the canvas after applying filters
  let newtargetimage = document.getElementById('targetimage');


  // Draw the image with filters applied to the canvas
  ctx.drawImage(newtargetimage, 0, 0, width, height);

  // Update the download link with the canvas data
  downloadlink.href = canvas.toDataURL('image/jpeg');
  // notify()

}

// Reset filters on reset button click
let sliderform = document.getElementById('slider-form');
sliderform.addEventListener('reset', function () {
  sliderform.reset();
  setTimeout(function () {
    applyFilters();
  }, 0);
});


    const notify = () => {
      alert("download successfully")
    }