	//Array of search terms to create buttons for
	var buttonList = ["apple", "orange", "banana", "pineapple", "grapes", "blueberry", "blackberry", "jackfruit", "strawberry", "grapefruit"];

	//Max number of pics to have on the page
	var maxPics = 10;

	//Adds a click listener to each image button to update the images
	$(document.body).on("click", ".btn", updateImages);

	//Adds a click listener so that it adds a button in the navbar when you hit the add-button
	$("#add-button").on("click", function(){

		//turns off default inputbox function
		event.preventDefault();

		//If not an empty entry, adds the new submission to the buttonList array
		var newEntry = $("#text-input").val().trim();
		if(newEntry != "") {
			buttonList.push(newEntry);
		
			//creates button for new submission
			renderButtons();
		}

		//Empties text-input field
		$("#text-input").val("");
	});

	function renderButtons() {

		//clears the navbar of buttons
		$(".navbar").empty();

		//adds a button for each entry in the buttonList function
		$.each(buttonList, function(index, element) {
			$(".navbar").append("<button type='button' class='btn btn-default navbar-btn' data-word='" + element + "'>" + element + "</button>");
		});

	}

	function updateImages() {

		var searchTerm = $(this).attr("data-word");
		
		//Runs a for-loop to update all ten images
		for (var i = 0; i < maxPics; i++) {

			console.log(searchTerm + i);
		}


	}


	//ON PAGE LOAD
	renderButtons();