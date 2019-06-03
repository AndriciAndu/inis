	
	// Create Entity Cards
	// ---------------------------

		function inis_createCards_entities() {

			Object.keys(inis_data.entities).map(function(key) { 

				let entity = inis_data.entities[key];

				let entity_category = entity.category;

				if (entity_category  != 'Company' 	&& 
					entity_category  != 'Faculty' 	&& 
					entity_category  != 'Venue' 	&& 
					entity_category  != 'Organization') {

					let newentityCard = document.createElement('DIV');
					newentityCard.classList = 'entityCard-wrapper col-6 sm-col-3 lg-col-2';
					newentityCard.innerHTML =
						`<div class="entityCard">
							<div class="entityCard__logoContainer"><img src="${entity.logo}"/></div>
							<div class="entityCard__overlay"></div>
							<div class="entityCard__title xs-hidden  sm-hidden">  ${entity.name}  </div>
							<div class="entityCard__title xs-visible sm-visible"> ${entity.abrev} </div>
							<div class="entityCard__linksContainer"> ${currEvt__getEntitySocialMediaLinks(entity)} </div>
						</div> ` ;

					let targetID = 'entities-cardsGroup--' + entity.category.replace(/ /g, '');

					document.getElementById(targetID).appendChild(newentityCard);
				}
			});

			// Intermediary Functions
			// ---------------------------

				function currEvt__getEntitySocialMediaLinks( entity__object ) {

					let links_html = '';

					let linksObj = entity__object.links;
					let facebook = linksObj.facebook;
					let fb_group = linksObj.fb_group;
					let meetup   = linksObj.meetup;
					let website  = linksObj.website;

					if (facebook) { links_html += `<a class="btn--social btn--social--facebook" target="_blank" href="${facebook}"></a>` };
					if (fb_group) { links_html += `<a class="btn--social btn--social--fbGroup"  target="_blank" href="${fb_group}"></a>` };
					if (meetup)   { links_html += `<a class="btn--social btn--social--meetup"   target="_blank" href="${meetup}"></a>`   };
					if (website)  { links_html += `<a class="btn--social btn--social--website"  target="_blank" href="${website}"></a>`  };

					return links_html
				};
		};

		inis_createCards_entities();