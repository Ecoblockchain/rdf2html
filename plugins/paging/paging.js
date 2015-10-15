/**
* Ontology plugin
*
* Adds paging controls it can find in the N3 db
* @author: Pieter Colpaert
* @author: Michiel Vancoillie
*/

var $ = require('jquery');

// Main closure
module.exports =  function(db, container, prefixes) {
    addPaging(db, container);
};

var addPaging = function (db, container) {

    // Match the current URI. It's this URI you want to find next or previous pages of
    var currentURI = document.location.href.match(/(^[^#]*)/)[0];

    var firstPage = db.find(currentURI, "http://www.w3.org/ns/hydra/core#firstPage", null);
    var previousPage = db.find(currentURI, "http://www.w3.org/ns/hydra/core#previousPage", null);
    var nextPage = db.find(currentURI, "http://www.w3.org/ns/hydra/core#nextPage", null);
    var lastPage = db.find(currentURI, "http://www.w3.org/ns/hydra/core#lastPage", null);

    var pagination = $('<ul class="pagination"></ul>');


    if (firstPage.length > 0) {
        pagination.append('<li><a href="' + firstPage[0].object + '">&laquo;</a></li>');
    }

    if (previousPage.length > 0) {
        pagination.append('<li><a href="' + previousPage[0].object + '">Previous</a></li>');
    }

    if (nextPage.length > 0) {
        pagination.append('<li><a href="' + nextPage[0].object + '">Next</a></li>');
    }

    if (lastPage.length > 0) {
        pagination.append('<li><a href="' + lastPage[0].object + '">&raquo;</a></li>');
    }

    // Check if pagination isn't empty
    if (!pagination.is(':empty')) {
        container.append(pagination);
    }
};