		

	// Skeleton Overlay
	// ---------------------------

		// Creates an image outside the DOM
		// When the image is downloaded
		// -- (1) update the initial Element (elem === <img> ? elem.src : elem.backgroundImage)
		// -- (2) remove the overlay from the adequate Element (elem !== <img> ? elem : 'Nearest Parent with [.imgLoadingOverlay] class')

		function imgLoadingOverlay__activate ( target__HTMLElem ) {			
			var virtualImg = new Image();
			virtualImg.whenLoaded_targetElem = target__HTMLElem;
			virtualImg.addEventListener('load', imgLoadingOverlay__evtHandler);
			virtualImg.src = target__HTMLElem.getAttribute('data-loadImg-src');
		};

		function imgLoadingOverlay__evtHandler (e) {

			let virtualImg = e.target;
			let targetElem = virtualImg.whenLoaded_targetElem;

			if (targetElem.tagName === 'IMG') {
				targetElem.src = virtualImg.src;
				targetElem = getFirstParentByClassName(targetElem , 'imgLoadingOverlay');
			} else {
				targetElem.style.backgroundImage = `url(${virtualImg.src})`;
			};

			virtualImg.whenLoaded_targetElem = null;
			virtualImg.removeEventListener('load', imgLoadingOverlay__evtHandler);

			setTimeout(function(){ 
				requestAnimationFrame(function(){ 
					targetElem.classList.add('imgLoadingOverlay__exitTransition');											 
				});
				setTimeout(function(){ 
					targetElem.classList.remove('imgLoadingOverlay' , 'imgLoadingOverlay__exitTransition');
				}, 1000);	
			} , 16);
		};

	// Activate image-loading-overlay process
	// ---------------------------

		Array.from(document.getElementsByClassName('imgLoadingOverlay--target')).map(x => imgLoadingOverlay__activate(x));