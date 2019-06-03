

	// inis_events_addDateInfo() -- Create extra Date() parameters for all Events
	// ---------------------------
		// -- adds Date() parameters to each [inis_data.events] and [inis_data.online] items
		// -- uses the [item.date_start] and [item.date_end] properties

		function inis_events_addDateInfo() {

			// Get the current Date
			// ---------------------------
			// -- used to determine if the [event] has passed

				let current_date  = new Date();

				let current_day   = current_date.getDate();
				let current_month = current_date.getMonth();
				let current_year  = current_date.getFullYear();

				let current_timeIndex = current_date.getTime();

			// Call the [eventsData__run()] for [events] and [online]
			// ---------------------------

				inis_data.events.map(event__obj => inis_events_addDateInfo_run(event__obj) );
				inis_data.online.map(event__obj => inis_events_addDateInfo_run(event__obj) );

			// inis_events_addDateInfo_run()
			// ---------------------------

				function inis_events_addDateInfo_run(event__obj) {

					// Create Date format
					// ---------------------------

						event__obj.date_start = new Date(event__obj.date_start);
						event__obj.date_end   = new Date(event__obj.date_end);
						let date_start = event__obj.date_start;
						let date_end   = event__obj.date_end  ;

					// Store Date details as string 
					// ---------------------------

						event__obj.dateDetails = {};

					// Day Name & abbreviation
					// ---------------------------

						let dayName = date_getDayName(date_start); 
						event__obj.dateDetails.dayName      = dayName;
						event__obj.dateDetails.dayName_abbr = dayName.slice(0, 3);

					// Month Name & abbreviation
					// ---------------------------

						let monthName = date_getMonthName(date_start); 
						event__obj.dateDetails.monthName      = monthName;
						event__obj.dateDetails.monthName_abbr = monthName.slice(0, 3);

					// Start Time
					// ---------------------------

						let start_minutes = date_start.getMinutes(); if (start_minutes < 10) { start_minutes = '0'+ start_minutes };
						let start_hour    = date_start.getHours()  ; if (start_hour    < 10) { start_hour    = '0'+ start_hour    };

						let time_start = `${start_hour}:${start_minutes}`;
						event__obj.dateDetails.time_start = time_start; 

					// End Time
					// ---------------------------

						let end_minutes = date_end.getMinutes(); if (end_minutes < 10) { end_minutes = '0'+ end_minutes };
						let end_hour    = date_end.getHours()  ; if (end_hour    < 10) { end_hour    = '0'+ end_hour    };

						let time_end = `${end_hour}:${end_minutes}`;
						event__obj.dateDetails.time_end = time_end; 

					// Full Time
					// ---------------------------

						event__obj.dateDetails.time = `${time_start} - ${time_end}`;

					// hasPassed
					// ---------------------------

						event__obj.hasPassed = (date_end.getTime() > current_timeIndex) ? false : true;

					// Remove extra spacing from [Description] String
					// ---------------------------

						event__obj.description = event__obj.description.replace(/\n|\t|  /g, '');
				};

			// Intermediary Functions
			// ---------------------------

				function date_getDayName(date , returnAbbreviation__boolean) {
					let dayName = [ 'Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' ][date.getDay()]
					return ( returnAbbreviation__boolean ? dayName.slice(0, 3) : dayName )
				};
				function date_getMonthName(date , returnAbbreviation__boolean) {
					let monthName = [ 'January' , 'February' , 'March'     , 'April'   , 'May'      , 'June'     , 
									  'July'    , 'August'   , 'September' , 'October' , 'November' , 'December' ][date.getMonth()]
					return ( returnAbbreviation__boolean ? monthName.slice(0, 3) : monthName )
				};
		};

		inis_events_addDateInfo();