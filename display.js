/////////////////////////
//      VARIABLES
/////////////////////////	

	//Array of search terms to create buttons for
	//var topics = ["apple", "orange", "banana", "pineapple", "grapes", "blueberry", "blackberry", "jackfruit", "strawberry", "grapefruit"];
	// var topics = ["action", "adventure", "cartoon", "comedy", "documentary", "drama", "horror", "musical", "sci-fi", "thriller", "western"];
	var topics = ["beach", "cave", "cliff", "city", "desert", "forest", "mountain", "ocean", "plains", "river", "swamp", "volcano"];

	//Max number of pics to have on the page
	var maxPics = 10;

/////////////////////////
//      ON CLICKS
/////////////////////////	

	//Adds a click listener to each image button to update the images
	$(document.body).on("click", "#picBtn", refreshImages);


	//Adds a click listener so that it adds a button in the navbar when you hit the add-button
	$("#add-button").on("click", function(){

		//turns off default inputbox function
		event.preventDefault();

		//If not an empty entry, adds the new submission to the topics array
		var newEntry = $("#text-input").val().trim();
		
		//Checks for if button already exists for current search term
		if(topics.indexOf(newEntry.toLowerCase()) > -1) {
			alert("There's already a button for that!");
		}
		else if(newEntry != "") {
			topics.push(newEntry);
		
			//creates button for new submission
			renderButtons();
		}

		//Empties text-input field
		$("#text-input").val("");
	});

	$("#remove-button").on("click", function() {

		//turns off default inputbox function
		event.preventDefault();

		var removeEntry = $("#text-input").val().trim();

		//if button exists, removes it
		console.log(topics.indexOf(removeEntry));
		if(topics.indexOf(removeEntry) > -1) {
			topics.splice(topics.indexOf(removeEntry),1);
			renderButtons();
		}
		else {
			alert("Button not found");
		}

		//Empties text-input field
		$("#text-input").val("");
	});

/////////////////////////
//      FUNCTIONS
/////////////////////////		

	//Creates the buttons in the nav bar
	function renderButtons() {

		//clears the navbar of buttons
		$(".navbar").empty();

		//adds a button for each entry in the topics function
		$.each(topics, function(index, element) {
			$(".navbar").append("<button type='button' class='btn btn-default navbar-btn' id='picBtn' data-word='" + element + "'>" + element + "</button>");
		});

	}

	//Loads new gifs based on the search term of the button pressed
	function refreshImages() {

		//Clears previous images
		for(var i = 0; i < maxPics; i++) {
			$("#image" + i).empty();
		}

		var searchTerm = $(this).attr("data-word");
		
		//My personal Giphy API key
		var apiKey = "6de2f9b1af6f4e0e8334f3eb862e8276";

		//Combined URL for Giphy with API key, search term, number of pics, and rating
		//****If loop for if there is a ratings filter
		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm + "&limit=" + maxPics;

		// Creates AJAX call for the specific image button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

    		if(response.data.length === 0) {
    			alert("No gifs found!");
    		}
    		else {
	    		//For each of the images in the response array (number determined by maxPics)
	    		for(var i = 0; i < response.data.length; i++) {
	   				
	   				//creates an variable with html img brackets  
	   				var newImage = $("<img>");
	   				//Sets source to still URL
	   				newImage.attr("src", response.data[i].images.original_still.url);
	   				//Sets data attribute to equal res moving URL
	   				newImage.attr("data-altSRC", response.data[i].images.original.url);
	   				newImage.attr("alt", response.data[i].slug);
	   				
					//Sets the images to be equal to the the width of the columns
	   				newImage.css("minWidth",$(".col-md-3").width());
	   				newImage.css("maxWidth", "100%");
	   				
	         		
	         		//Swaps the still and moving URLS when clicked
	   				newImage.on("click", function() {
	   					var tempURL = $(this).attr("src");
	   					$(this).attr("src", $(this).attr("data-altSRC"));
	   					$(this).attr("data-altSRC", tempURL);
	   				});
	   				//Appends newImage to appropriate image div
	         		$("#image" + i).append(newImage);
	         		//Appends rating underneath gif
	         		$("#image" + i).append("<p>Rating: " + response.data[i].rating.toUpperCase() + "</p>");
	         	}
	         }
    	});

	}

/////////////////////////
//   IMMEDIATE CODE
/////////////////////////	

	renderButtons();

