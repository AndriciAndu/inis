
	// Component -- navbar
	// ---------------------------

		function component__navbar_evtHandler(e) {

			let target = e.target;

			if (hasClass(target, 'inis-navbar__btn--tabBtn')) {

				Array.from(document.getElementById('inis-navbar').getElementsByClassName('inis-navbar__btn--tabBtn')).map(x => x.classList.remove('active'));
				target.classList.add('active');

				let targetClass = target.getAttribute('data-targetTab');
				Array.from(document.getElementById('inis-main').getElementsByClassName('inis--tab')).map(function(tab){
					if (hasClass(tab, targetClass)) { tab.classList.add   ('active') }
					else                            { tab.classList.remove('active') }
				})
			}
		};

		// function component__navbar_setParameters() {
			
		// }

		document.getElementById('inis-navbar').addEventListener('click', component__navbar_evtHandler);