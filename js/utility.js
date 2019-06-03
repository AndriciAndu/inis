
	// Utility Functions
	// ---------------------------

		// hasClass
		// ---------------------------
		// -- check if an Element has a specific class
		// -- returns [Boolean]

			function hasClass ( target__HTMLElem , class__String ) {
				return (" " + target__HTMLElem.className + " " ).indexOf( " " + class__String + " " ) > -1
			};

		// getFirstParentByClassName
		// ---------------------------
		// -- get nearest ParentElement which has a specific class
		// -- returns [HTMLElement] or [null]

			function getFirstParentByClassName ( target__HTMLElem , class__string ) {

				let elemParent = target__HTMLElem.parentElement;
				let parentFound = false;

				while (elemParent && !parentFound) {
					if ((" "+elemParent.className+" ").indexOf(" "+class__string+" ") > -1) { 
						parentFound = true;
					} else {
						elemParent = elemParent.parentElement;
					}
				};
					
				return elemParent
			};