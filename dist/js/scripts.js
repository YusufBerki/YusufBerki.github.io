/*!
* Start Bootstrap - Resume v7.0.5 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
    loadVideos();

});

var reqURL = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent("https://www.youtube.com/feeds/videos.xml?channel_id=UCYhQVqYj05Cqa44QrE48HQA");
var numberOfVideo = 10

function loadVideos() {
    function putVideos(data) {
        console.log("data", data)
        var htmlContent = ""

        numberOfVideo = numberOfVideo >= data.items.length ? data.items.length : numberOfVideo
        
        for (let videoNumber = 0; videoNumber < numberOfVideo; videoNumber++) {
            var link = data.items[videoNumber].link;
            var title = data.items[videoNumber].title;

            htmlContent += `<li>
            <span class="fa-li"><i class="fab fa-youtube text-danger"></i></span>
            <a href="${link}">${title}</a>
        </li>`;
        }
        document.getElementById('yt-videos').innerHTML = htmlContent;

    }

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3DUCYhQVqYj05Cqa44QrE48HQA", requestOptions)
        .then(response => response.json())
        .then(result => putVideos(result))
        .catch(error => console.log('error', error));


}


