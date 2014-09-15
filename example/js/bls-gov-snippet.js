// Self executing javascript module following the js module pattern
(function($, dom){
    if (typeof $ == 'undefined') {
        console.log("jQuery is not loaded, this example will not work");
    } else {
        // JQuery is loaded, lets rock and roll

        // Checking for document ready, though our example has jquery at 
        // the bottom of the body so this isn't really necessary.
        $(dom).ready(function() {
            // Using local URL proxy via json-proxy in grunt-contrib-connect
            var url = '/bls/api/v1/timeseries/data/LAUCN040010000000005';

            $.ajax({
                contentType: 'application/json',
                dataType: 'json',
                url: url
            }).done(function(result) {
                console.log("success", result);
                renderBLS(result);
            }).fail(function(jqXHR, message) {
                console.log("fail", jqXHR, message);
            });
        });

        function renderBLS(data) {
            var results = data.Results.series[0].data,
                $list = $('.ajax-request-result');
            $('.ajax-request-status').html("Status: " + data.status + ", responseTime: " + data.responseTime);

            $.each(results, function(i, v) {
                $list.append("<li class='result-item'>" + resultItemConcat(v) + "</li>");
            });

            // local function for rendering
            function resultItemConcat(item) {
                return item.period + "-" + item.periodName + "-" + item.year + " = " + item.value;
            };
        };
    }
})(window.jQuery, document);