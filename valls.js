(function ($) {
    Drupal.behaviors.vallsContainerWidth = {
        attach: function (context, settings) {
            $(window).on("load", function () {
                // Assign the image containter the same width
                // This will aloow to position it with: margin: 0 auto;
                // because the image will loose its position when the CloudZoom library is used
                var imageSize = $('.field-name-field-image .field-item img').width();
                $('.field-name-field-image .field-item').width(imageSize);
            });
        }
    };
    Drupal.behaviors.vallsFilters = {
        attach: function (context, settings) {
            function getValues(selector) {
                var elements = $(selector);
                var values = [];
                for (var i = 0; i < elements.length; i++) {
                    values[i] = elements[i].innerHTML.trim();
                }
                return values;
            }

            var wrapper = '.view-selected-works';
            var works = $('.views-row', wrapper);
            var n = works.length;

            var categories = getValues('.views-field-field-category', wrapper);
            var artists = getValues('.artist', wrapper);
            var sortBy = getValues('.views-field-field-sort-by-name', wrapper);
            var titles = getValues('.title a', wrapper);

            var categoryFilter = $('#edit-field-category-tid-selective', wrapper);
            var artistFilter = $('#edit-field-artist-tid-selective', wrapper);
            var textFilter = $('#edit-combine', wrapper);
            var resetFilters = $('#edit-reset', wrapper);

            var categoriesList = categories.slice(0);
            // Sort
            categoriesList.sort();
            // Remove duplicates
            categoriesList = categoriesList.filter(function(item, pos, ary) {
                return !pos || item != ary[pos - 1];
            });
            // Remove the empty element (no category)
            if (categoriesList.length > 0 && categoriesList[0] == '') {
                categoriesList.shift();
            }

            for(var i=0; i < categoriesList.length; i++) {
                categoryFilter.append(
                    $('<option></option>').val(i).html(categoriesList[i])
                );
            }


            var artistList = [];
            for (var i = 0; i < n; i++) {
                artistList[i] = {
                    name: artists[i],
                    sortBy: sortBy[i]
                }
            }
            // Sort
            artistList.sort(function(a, b) {
                return a.sortBy.localeCompare(b.sortBy);
            });
            for (var i = 0; i < n; i++) {
                artistList[i] = artistList[i].name;
            }
            // Remove duplicates
            artistList = artistList.filter(function(item, pos, ary) {
                return !pos || item != ary[pos - 1];
            });
            // Remove the empty element (no artist)
            if (artistList.length > 0 && artistList[0] == '') {
                artistList.shift();
            }

            for(var i=0; i < artistList.length; i++) {
                artistFilter.append(
                    $('<option></option>').val(i).html(artistList[i])
                );
            }

            function showAllWorks() {
                for (var i = 0; i < works.length; i++) {
                    $(works[i]).show();
                }
            }

            function filterWorks(matchTerms, value) {
                $(categoryFilter)[0].selectedIndex = 0;
                $(artistFilter)[0].selectedIndex = 0;
                $(textFilter).val(value);

                for (var i = 0; i < works.length; i++) {
                    if (value == matchTerms[i]) {
                        $(works[i]).show();
                    } else {
                        $(works[i]).hide();
                    }
                }
            }

            categoryFilter.change(function() {
                filterWorks(categories, $("option:selected", this).text());
            });

            artistFilter.change(function() {
                filterWorks(artists, $("option:selected", this).text());
            });

            textFilter.attr('autocomplete','off');
            textFilter.on('input', function() {
                var text = $(this).val();

                for (var i = 0; i < works.length; i++) {
                    if (titles[i].toLowerCase().indexOf(text.toLowerCase()) !== -1 || artists[i].toLowerCase().indexOf(text.toLowerCase()) !== -1 ) {
                        $(works[i]).show();
                    } else {
                        $(works[i]).hide();
                    }
                }
            });

            resetFilters.click(function(event) {
                event.preventDefault();
            });
            resetFilters.mousedown(function(event) {
                $(textFilter).val('');
                showAllWorks();
            });
        }
    };
})(jQuery);
