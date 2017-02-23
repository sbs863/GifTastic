//array of initial shows
var shows = [
    "Deadwood", "The Wire", "Breaking Bad", "Rick and Morty", "Star Trek", "Enlightened", "Game of Thrones", "Peep Show", "The Mighty Boosh", "IT Crowd",
    "Summer Heights High", "The Sopranos", "Silicon Valley", "Luther", "Sherlock", "Home Movies", "Space Ghost Coast to Coast", "The Venture Brothers",
    "Halt and Catch Fire", "Mad Men", "Arrested Development", "House of Cards", "The Office", "Orange is the New Black", "True Detective", "Firefly",
    "Cowboy Bebop", "Seinfeld", "Twlight Zone", "It's Always Sunny In Philadelphia", "Battlestar Galactica", "Spaced", "Berserk", "The West Wing",
    "Black Mirror", "Garth Merenghi's Dark Place", "Black Books", "Louie", "Baskets", "Mr. Robot", "Band Of Brothers", "Broadchurch", "Limmy's Show",
    "Party Down",
];


$(document).ready(function() {

    //this function will create buttons out of all the items in the shows array and add them to the page
    function addShow() {
        //empty's 
        $('.buttons').empty();

        for (var i = 0; i < shows.length; ++i) {
            // creates buttons and defines their attributes
            var showButtons = $('<button type="button" class="btn-lg btn-primary" value = "" data-toggle="button" aria-pressed="false" autocomplete="off">' + shows[i] + '</button>');
            showButtons.attr('data-name', shows[i]);
            showButtons.addClass("MYCLASS");
            $('.buttons').append(showButtons);

        }
        //creates a click function
        $(".MYCLASS").on('click', function() {
            $('.gifsHere').html("");
            //'this' will allow us to target the name attribute of any button that is clicked so that we can input it into the query url for each indiv buttons.
            var clickName = $(this).data('name');
            //Giphy API key

            var queryURL = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="' + clickName + '"';

            function showRandomGif() {
                $.ajax({
                    url: queryURL,
                    method: 'GET'
                })

                .done(function(response) {
                    console.log(response);
                    var results = response.data;
                    var gifDiv = $('<div class ="items">');
                    var gif = $('<img>');
                    gif.addClass("imgClass");
                    gif.attr('data-state', 'still');
                    gif.attr('src', results.image_original_url+"_s");
                    gif.attr('data-still', results.image_original_url+"_s");
                    gif.attr('data-animate', results.image_original_url);
                    $('.gifsHere').prepend(gif);
                });
            }


            for (var i = 0; i < 10; i++) {

                showRandomGif();
            }

            $('.imgClass').on('click', function() {

                var state = $(this).attr('data-state');

                if (state == 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                }

            });
        });

    }
    addShow();

    $('.submit').on('click', function() {
        var search = $('#showInput').val().trim();

        shows.push(search);

        addShow();

        return false;

    });
});

//ok so we have a number of buttons on the page. 
//we also have the ability to add new buttons
//might be nice to have the ability to delete a buttons after we have added it without refreshing the page!
//
//When I click one of the buttons I want it to query the giphy API and display 10 gifs related to the text of the button
//When I click a new button I want the gifs to clear and the new gifs to appear
