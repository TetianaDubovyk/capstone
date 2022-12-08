document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#top').style.display = 'block';
    document.querySelector('#single_wine').style.display = 'none';

    // To filter continents
    document.querySelector('#continents').onchange = function () {
        selected_continent = `${this.value}`;
        console.log(selected_continent);
        window.location.href = `http://127.0.0.1:8000/continents?continent=${selected_continent}`;
    }

    // To filter countries
    document.querySelector('#countries').onchange = function () {
        sel_continent = document.querySelector('#continents').value;
        selected_country = this.value;
        console.log(selected_country);
        console.log(sel_continent);
        window.location.href = `http://127.0.0.1:8000/countries?country=${selected_country}&continent=${sel_continent}`;
    }

    // Filter through the menu
    const menu = document.querySelectorAll('li');
    for (const item of menu) {
        item.addEventListener('click', function() {
            let selected_type = item.innerHTML; 
            console.log(selected_type);
            window.location.href = `http://127.0.0.1:8000/types?wine_type=${selected_type}`;
        })
    }

    // Find all the cards
    const cards = document.querySelectorAll('.card');

    for (const card of cards) {
        // Open an each card by a click
        card.addEventListener('click', function() {
            console.log(card);
            // Get id of a card
            let wine_id = card.querySelector('#card-id').innerHTML;
            // Fetch all info of the choosen wine
            fetch(`http://127.0.0.1:8000/single_wine_content?wine_id=${wine_id}`)
            .then(response => response.json())
            .then(card_info => {
                 console.log(card_info);
                // console.log(card_info[0].pk);
                // card_info[0] - data from Wine_card Django model
                // card_info[1] - data from Personal_rating Django model
                // cards_info[2] - data from Regions_and_flags model
                show_wine(card_info[0].fields, card_info[0].pk, card_info[1].fields, card_info[2].fields);
                });
            });
    }
    window.scrollTo({ top:50, left:0, behavior: "instant"})
});


function show_wine(card, id, rating, country) {
    console.log(card);
    console.log(country.country)
    console.log(rating);
    console.log(id);

    // Hide the main page
    document.querySelector('#top').style.display = 'none';

    // Show single wine page 
    single_wine = document.querySelector('#single_wine');
    single_wine.style.display = 'block';

    // Ctear all previous data from a page
    single_wine.querySelector('#flag').innerHTML = "";
    single_wine.querySelector('#wine_region').innerHTML = "";
    single_wine.querySelector('#created_date').innerHTML = "";
    single_wine.querySelector('#wine_type').innerHTML = "";
    single_wine.querySelector('i').innerHTML = "";
    single_wine.querySelector('#wine_description').innerHTML = "";
    single_wine.querySelector('#wine_grapes').innerHTML = "";
    single_wine.querySelector('#static_image').style.backgroundImage = "";
    single_wine.querySelector('#wine_media').innerHTML = "";
    single_wine.querySelector('#icons_chart').innerHTML = "";
    single_wine.querySelector('#recommend').innerHTML = "";
    document.querySelector('#new_carousel').innerHTML = "";

    // Populate tags with the wine data
    single_wine.querySelector('#wine_region').innerHTML = `${card.continent} / ${country.country}`;
    single_wine.querySelector('#created_date').innerHTML = card.post_created_date;
    single_wine.querySelector('#wine_type').innerHTML = `${card.type} from ${card.winery_name}`;
    single_wine.querySelector('i').innerHTML = `$ ${card.price}`;
    single_wine.querySelector('#wine_description').innerHTML = card.description;

    single_wine.querySelector('#grapes_img').src = "/static/wine_blog/media/grapes.png"

    // Show all grapes of the wine
    if (card.grapes_list && card.special_grapes) {
        single_wine.querySelector('#wine_grapes').innerHTML = `${card.grapes_list}, ${card.special_grapes} ${card.year}`;
    }
    else if (card.grapes_list) {
        single_wine.querySelector('#wine_grapes').innerHTML = `${card.grapes_list} ${card.year}`;
    }
    else {
        single_wine.querySelector('#wine_grapes').innerHTML = `${card.special_grapes} ${card.year}`;
    }

    // Show header image based on the type of the wine
    static_image = single_wine.querySelector('#static_image');

    if (card.type.includes("Red")) {
        static_image.style.backgroundImage = "url('/static/wine_blog/media/red.png')";
    }
    else if (card.type.includes("Rose")) {
        static_image.style.backgroundImage = "url('/static/wine_blog/media/rose.png')";
    }
    else if (card.type.includes("Sparkling")) {
        static_image.style.backgroundImage = "url('/static/wine_blog/media/sparc.png')";
    }
    else {
        static_image.style.backgroundImage = "url('/static/wine_blog/media/white.png')";
    }

    flag = single_wine.querySelector('#flag');
    flag.className = `flag-icon flag-icon-${country.code}`

    // Load the media info of a particular wine and create media tags for it
    media = single_wine.querySelector('#wine_media');
    
    // Create new img element
    const wine_img = document.createElement('img');
    wine_img.className = 'img-thumbnail';
    wine_img.style = 'width:700px; object-fit: cover; padding: 10px; max-width: 100%; height: auto;';

    // Check if there is an image in the QuesrySet
    if (card.image_url) {
        wine_img.src = card.image_url;
        console.log(card.image_url)
    }
    // If not, set the image from local storage
    else {
        wine_img.src = '/static/wine_blog/media/riesling.jpg';
    }

    media.appendChild(wine_img);
    
    // Create new video tag 
    if (card.video_url) {
        console.log(card.video_url)
        const wine_video = document.createElement('video');
        type="video/mp4";
        wine_video.autoplay = true;
        wine_video.muted = true;
        wine_video.loop = true;
        wine_video.height = 630; 
        wine_video.width = 630;
        wine_video.style = "margin-top: 60px; max-width: 100%; height: auto;"
        wine_video.src = card.video_url;
        media.appendChild(wine_video);
    }
    
    // Find the chart sector
    chart = single_wine.querySelector('#icons_chart');

    // Get all rating fields 
    for (item in rating) {
        //console.log(item);

        if (item !== "recommend") {

            // Create new div for an icon
            const icon = document.createElement('div');
            icon.className = "col text-center";
            icon.id = "icon";
            icon.style = "padding: 20px;"
            
            // Create h5 tag 
            const name_field = document.createElement('h5');
            name_field.className = "name-field";
            name_field.style = "font-family: Georgia, serif; font-size:18px; margin-bottom:2px; padding: 10px;";
            name_upper = item.toUpperCase()
            name_field.innerHTML = name_upper
            icon.appendChild(name_field);

            // Create i tag for an actual icon
            const i = document.createElement('i');
            i.className = "fa-solid fa-wine-glass-empty fa-3x";

            if (card.type.includes("Red")) {
                i.style = "color:#F71450; padding: 5px;"
            }
            else {
                i.style = "color:NavajoWhite; padding: 5px;";
            }
            
            icon.appendChild(i);

            // Create a div for stars chart
            const stars = document.createElement('div');
            stars.className = "stars";
            stars.style = "padding-top: 10px; display: flex;flex-wrap: nowrap; justify-content: center";
            
            // Get the value of the field
            const active_stars = parseInt(rating[item]);

            // Count the number of unactive stars out of 5 possible stars
            const unactive_stars = 5 - active_stars;

            // Create active stars
            for (let i = 0; i < active_stars; i++) {
                const single_active_star = document.createElement('i');
                single_active_star.className = "fa fa-star fa-2xl";
                single_active_star.style = "color:#fbc634 !important;"
                stars.appendChild(single_active_star);
            }

            // Create unactive stars
            for (let i = 0; i < unactive_stars; i++) {
                const single_unactive_star = document.createElement('i');
                single_unactive_star.className = "fa fa-star fa-2xl";
                single_unactive_star.style = "color:#cecece;";
                stars.appendChild(single_unactive_star);
            }

            icon.appendChild(stars);
            chart.appendChild(icon);
        }
    }

    // Find the recommend sector
    recommend = single_wine.querySelector('#recommend');

    // Create the unswer
    const unswer = document.createElement('p');
    unswer.innerHTML = "Do I recommend it?";
    unswer.style = "color:MediumSeaGreen;";
    recommend.appendChild(unswer);

    console.log(rating);

    if (rating.recommend === true) {
        // Create an icon for the unswer "yes"
        const recommendation = document.createElement('i');
        recommendation.className = "fa-solid fa-circle-check fa-4x";
        recommendation.style = "color:MediumSeaGreen;";
        recommend.appendChild(recommendation);
    }
    else if (rating.recommend === false) {
        // Create an icon for the unswer "no"
        const recommendation = document.createElement('i');
        recommendation.className = "fa-solid fa-circle-xmark fa-4x";
        recommendation.style = "color:#F71450;";
        recommend.appendChild(recommendation);
    }

    window.scrollTo({ top:50, left:0, behavior: "instant"})

    // Create a carousel of wine cards (associated by country) excluding current wine
    get_associated_wines(card.country, id, country.country);
}

function get_associated_wines(country_id, id, country_name) {
    // Fetch all associated wines
    fetch(`http://127.0.0.1:8000/associated_wines?country=${country_id}&id=${id}`)
    .then(response => response.json())
    .then(cards => {
        console.log(cards);
        if (cards.length == 0) {
            console.log("noCards");
            const more_wine = document.querySelector('#more_wine');
            more_wine.style.display = "none";
        }
        else {
            render_associated_cards(cards, country_name);
        }
        });
}

function render_associated_cards(cards, country) {
    // Find carousel div
    const carousel = document.querySelector('#new_carousel');

    // For card in cards
    let i, len;
    for (i = 0, len = cards.length; i < len; i++) {
        const card = cards[i];

        // If there is associated cards, create a carousel 
        if (card.fields) {
            const associated_wine = document.querySelector('#more_wine');
            associated_wine.style.display = "block";

            // Create carousel item
            const item = document.createElement('div');
            item.className = "col";
            item.id = "item";
            item.style = "cursor: pointer; padding: 15px; transition: all linear 0.25s;";

            // Create carousel items image
            const img_associated = document.createElement('img');
            img_associated.style = "width:340px; object-fit: cover; box-shadow: 1px 1px 10px 3px LightGray; max-width: 340px; max-height: 340px; min-width: 160px;";
            img_associated.className = "rounded-pill";

            if (card.fields.image_url) {
                img_associated.src = card.fields.image_url;
            }
            else {
                img_associated.src = "/static/wine_blog/media/wineglass.png";
            }

            item.appendChild(img_associated);

            const header = document.createElement('h4');
            header.innerHTML = `${country} > ${card.fields.grapes_list} ${card.fields.special_grapes}`;
            header.style = "font-size: 15px; color:#437541; text-align: center; text-transform: uppercase; padding: 10px;";
            item.appendChild(header);

            // Add eventListener to an item to open it
            item.addEventListener('click', function(event) {
                event.preventDefault();
    
                // Pass the the primary key of a card to the function
                open_carousel_card(card.pk);
            });

            // If associated cards more then 3 items, hide the extra items
            if (i >= 3) {
                console.log(`carousel ${i}`);
                item.style.display = "none";
                item.id = "item-hidden";
            }

            // Append new item to the carousel
            carousel.appendChild(item);
        }
        else {
            console.log("noCards");
            const more_wine = document.querySelector('#more_wine');
            more_wine.style.display = "none";
        }
    }

    // Find all hidden associated items 
    hidden_items = carousel.querySelectorAll("#item-hidden");
    console.log(hidden_items.length)

    if (hidden_items.length >= 1) {

        div_for_chevrons = document.createElement('div');
        div_for_chevrons.id = "div_for_chevrons"
        carousel.appendChild(div_for_chevrons);

        // Create two chevrones
        chevron = document.createElement('i');
        chevron.id = "chevron_down";
        chevron.style = "display:block; --fa-animation-duration: 1.5s;";
        chevron.className = "fa-solid fa-chevron-down fa-4x fa-beat";
        div_for_chevrons.appendChild(chevron);

        chevron_up = document.createElement('i');
        chevron_up.style = "display:none;";
        chevron_up.className = "fa-solid fa-chevron-up fa-4x";
        div_for_chevrons.appendChild(chevron_up);

        // Show hidden associated items
        chevron.addEventListener('click', function() {
            for (item of hidden_items) {
                item.style.display = "block";
            }
            chevron.style.display = "none";
            chevron_up.style.display = "block";
        });

        // Hide prewiousley showed associated items
        chevron_up.addEventListener('click', function() {
            for (item of hidden_items) {
                item.style.display = "none";
            }
            chevron_up.style.display = "none";
            chevron.style.display = "block";
        });

        chevron.style.display = "block";
    }
}


function open_carousel_card(pk) {

    // Fetch all info of the wine
    fetch(`http://127.0.0.1:8000/single_wine_content?wine_id=${pk}`)
    .then(response => response.json())
    .then(card_info => {
        console.log(card_info);

        // card_info[0] - data from Wine_card Django model, card_info[1] - data from Personal_rating Django model
        show_wine(card_info[0].fields, card_info[0].pk, card_info[1].fields, card_info[2].fields);
        });
}