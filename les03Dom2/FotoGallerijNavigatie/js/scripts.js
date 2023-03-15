const figBig = document.querySelector('#figBig');
const thumbLinks = document.querySelectorAll('.thumbs a');
const btnPrev = document.querySelector('#btnPrev');
const btnNext = document.querySelector('#btnNext');
let currentImage = 0;

function showImage(lnk) {
   figBig.querySelector('img').src = lnk.href;
   figBig.querySelector('figcaption').innerHTML = lnk.querySelector('img').alt;
   document.querySelector('.thumbs .active').classList.remove('active');
   lnk.classList.add('active');
}

thumbLinks.forEach(lnk => {
   lnk.addEventListener('click', function(e) {
      e.preventDefault();
      showImage(lnk);
   });
});

function showPrevImage() {
   currentImage = (currentImage == 0) ? thumbLinks.length - 1 : currentImage - 1;
   showImage(thumbLinks[currentImage]);
}

function showNextImage() {
   currentImage = (currentImage == thumbLinks.length - 1) ? 0 : currentImage + 1;
   showImage(thumbLinks[currentImage]);
}

// https://www.w3schools.com/jsref/event_onkeydown.asp
document.addEventListener('keydown', function(e) {
   if (e.key == 'ArrowLeft') {
      showPrevImage();
   } else if (e.key == 'ArrowRight') {
      showNextImage();
   }

   if (e.ctrlKey && e.key >= '1' && e.key <= '5') {
      const index = parseInt(e.key) - 1; 
      if (index < thumbLinks.length) {
         currentImage = index;
         showImage(thumbLinks[currentImage]);
      }
   }
});

btnPrev.addEventListener('click', showPrevImage);
btnNext.addEventListener('click', showNextImage);

