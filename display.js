	//Array of search terms to create buttons for
	var topics = ["apple", "orange", "banana", "pineapple", "grapes", "blueberry", "blackberry", "jackfruit", "strawberry", "grapefruit"];

	//Max number of pics to have on the page
	var maxPics = 10;

	//Adds a click listener to each image button to update the images
	$(document.body).on("click", ".btn", updateImages);

	//Adds a click listener so that it adds a button in the navbar when you hit the add-button
	$("#add-button").on("click", function(){

		//turns off default inputbox function
		event.preventDefault();

		//If not an empty entry, adds the new submission to the topics array
		var newEntry = $("#text-input").val().trim();
		if(newEntry != "") {
			topics.push(newEntry);
		
			//creates button for new submission
			renderButtons();
		}

		//Empties text-input field
		$("#text-input").val("");
	});

	function renderButtons() {

		//clears the navbar of buttons
		$(".navbar").empty();

		//adds a button for each entry in the topics function
		$.each(topics, function(index, element) {
			$(".navbar").append("<button type='button' class='btn btn-default navbar-btn' data-word='" + element + "'>" + element + "</button>");
		});

	}

	function updateImages() {

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

    		for(var i = 0; i < response.data.length; i++) {
   				
   				//creates an image variable with a
   				var newImage = $("<img>");
   				//Sets source to still URL
   				newImage.attr("src", response.data[i].images.original_still.url);
   				//Sets data attribtue to equal res moving URL
   				newImage.attr("data-altSRC", response.data[i].images.original.url);
   				newImage.attr("alt", response.data[i].slug);
   				newImage.css("maxWidth", "100%");
   				newImage.css("maxHeight", "auto");
         		
         		//Swaps the still and moving URLS on click
   				newImage.on("click", function() {
   					var tempURL = $(this).attr("src");
   					$(this).attr("src", $(this).attr("data-altSRC"));
   					$(this).attr("data-altSRC", tempURL);
   				});
   				//Appends newImage to appropriate image div
         		$("#image" + i).append(newImage);
         		//Appends rating underneath gif
         		$("#image" + i).append("<p style='text-align: center;'>Rating: " + response.data[i].rating.toUpperCase() + "</p>");
         	}
    	});

	


	}

	//Pictures on click swtich to animated url

	//ON PAGE LOAD
	renderButtons();