	
	// Create Event Cards
	// ---------------------------

		function inis_createCards_events( events__array , target__HTMLElem ) {

			let newDocFragment = document.createDocumentFragment();

			// Create [Event Cards] (and [Days])
			// ---------------------------

				events__array.map(function(event){

					// Run only for Events that have not passed
					// ---------------------------

						if (!event.hasPassed) {

							// Get Venue Object (location) || Set default
							// ---------------------------

								let venue = inis_data.entities[event.venue_id] || 
									{ name : 'coming soon' , abrev : 'coming soon' , logo  : 'logos/comingSoon.jpg' , gmaps : '' };

							// Set Cover Photo
							// ---------------------------
							// -- if no cover provided, use first organizer's logo as the cover

								let organizer = inis_data.entities[event.organizers[0]];
								let coverSrc = event.coverSrc || organizer.logo;

							// Set Organizers
							// ---------------------------

								let organizersString = '';
								event.organizers.map(function(x){ 
									let organizer = inis_data.entities[x];
									let organizerLink = organizer.links.facebook || organizer.links.meetup || organizer.links.website;
									organizersString += 
										`<a href="${organizerLink}" target="_blank" class="eventCard__btn--organizer imgLoadingOverlay">
											<img class="imgLoadingOverlay--target" data-loadImg-src="${organizer.logo}">
										</a>`
								});

							// Set Date
							// ---------------------------

								let eventDay = event.date_start.getDate();
								let eventDayString = (eventDay < 10) ? ('0' + eventDay) : eventDay;
								let dateString = `${event.dateDetails.dayName_abbr}, ${eventDayString} ${event.dateDetails.monthName_abbr}`;

							// Create HTML Element for each [eventCard]
							// ---------------------------

								let newElem = document.createElement('DIV');
								newElem.classList = 'col-12 sm-col-6 lg-col-4 eventCard-wrapper';

								newElem.innerHTML = 
									`<div class="eventCard" data-eventIndex="${event.eventIndex}">

										<div class="eventCard__cover imgLoadingOverlay imgLoadingOverlay--target" 
											data-loadImg-src="${coverSrc}"></div>

										<div class="eventCard__details">

											<div class="eventCard__details__date">
												<div class="eventCard__details__date__dayName">
													${event.dateDetails.dayName_abbr}
												</div>

												<hr  class="eventCard__details__date__hr">

												<div class="eventCard__details__date__dayNumber">
													${eventDayString}
												</div>

												<div class="eventCard__details__date__monthName">
													${event.dateDetails.monthName_abbr}
												</div> 
											</div>

											<div class="eventCard__details__time">
												${event.dateDetails.time}
											</div>

											<div class="eventCard__details__venue">
												<span class="eventCard__details__venue__span"></span>
												<a class="eventCard__details__venue__link" href="${venue.gmaps || null}" target="_blank">
													${venue.abrev || 'Coming soon'}
												</a>
											</div>

										</div>

										<div class="col eventCard__body">
											<div class="eventCard__title"> ${event.name} </div>
											<div class="eventCard__description"> ${event.description} </div>

											<div class="eventCard__btnContainer">
												<div class="eventCard__btnContainer__organizers"> ${organizersString} </div>
												<a class="eventCard__btn--eventLink" href="${event.eventLink}" target="_blank"> View Event </a>
											</div>
										</div>
									</div>` ;

							// Add Card to documentFragment
							// ---------------------------
							
								newDocFragment.appendChild(newElem);
						};
				});

			// Add all cards to DOM
			// ---------------------------

				target__HTMLElem.appendChild(newDocFragment);
		};

		inis_createCards_events( inis_data.events , document.getElementById('events') );
		inis_createCards_events( inis_data.online , document.getElementById('online') );