const $ = require("jquery");

$(document).ready(function () {
    $('#content-container').on('scroll', function () {
        $('#first-row').css('top', $('#content-container').scrollTop());
        $('#first-col').css('top', $('#content-container').scrollLeft());
        $('#tl-cell').css('top', $('#content-container').scrollTop());
        $('#tl-cell').css('top', $('#content-container').scrollLeft());
    });
   
})





