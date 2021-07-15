$(document).ready(function () {
    
    var selected = 3;
    var metric = $("#units").prop("checked");

    $("#ramp_height_feet, #ramp_height_inches, #units").on("input", calc);
    $("#ramp_length_feet, #ramp_length_inches, #ratio").on("input", calc);
    $(".radio").click(toggleValue);
    $("#units").click(toggleUnit);

    enableAll();
    $("#ratio").attr("disabled", "");
    $("#ratio").attr("checked", "");

    function calc() {
        toggleUnit();
        var heightFeet = parseFloat($("#ramp_height_feet").val());
        if (isNaN(heightFeet)) heightFeet = 0;

        var heightInches = parseFloat($("#ramp_height_inches").val());
        if (isNaN(heightInches)) heightInches = 0;

        var lengthFeet = parseFloat($("#ramp_length_feet").val());
        if (isNaN(lengthFeet)) lengthFeet = 0;

        var lengthInches = parseFloat($("#ramp_length_inches").val());
        if (isNaN(lengthInches)) lengthInches = 0;

        var ratio = parseFloat($("#ratio").val());
        if (isNaN(ratio)) ratio = 0;

        if (metric) {
            calcMetric(heightFeet, lengthFeet, ratio);
        } else {
            calcImperial(heightFeet, heightInches, lengthFeet, lengthInches, ratio);
        }
    }

    function calcMetric(heightFeet, lengthFeet, ratio) {

        if (selected == 1) {
            heightTotal = lengthFeet * ratio;
            $("#ramp_height_feet").val(heightTotal);
        } else if (selected == 2) {
            lengthTotal = heightFeet / ratio;
            $("#ramp_length_feet").val(lengthFeet);
        } else if (selected == 3) {
            $("#ratio").val(heightFeet / lengthFeet);
        }

    }

    function calcImperial(heightFeet, heightInches, lengthFeet, lengthInches, ratio) {

        var heightTotal = parseInt(heightFeet * 12) + heightInches;
        var lengthTotal = parseInt(lengthFeet * 12) + lengthInches;

        if (selected == 1) {
            heightTotal = lengthTotal * ratio;
            heightFeet = Math.floor(heightTotal / 12);
            heightInches = heightTotal % 12;
            $("#ramp_height_feet").val(heightFeet);
            $("#ramp_height_inches").val(heightInches);
        } else if (selected == 2) {
            lengthTotal = heightTotal / ratio;
            lengthFeet = Math.floor(lengthTotal / 12);
            lengthInches = lengthTotal % 12;
            $("#ramp_length_feet").val(lengthFeet);
            $("#ramp_length_inches").val(lengthInches);
        } else if (selected == 3) {
            $("#ratio").val(heightTotal / lengthTotal);
        }

    }

    function toggleValue() {
        if ($("#heightRadio")[0].checked) {
            enableAll();
            $("#ramp_height_feet").attr("disabled", "");
            $("#ramp_height_inches").attr("disabled", "");
            selected = 1;
        } else if ($("#lengthRadio")[0].checked) {
            enableAll();
            $("#ramp_length_feet").attr("disabled", "");
            $("#ramp_length_inches").attr("disabled", "");
            selected = 2;
        } else if ($("#ratioRadio")[0].checked) {
            enableAll();
            $("#ratio").attr("disabled", "");
            selected = 3;
        }
        calc();
    }

    function enableAll() {
        $("#ramp_length_feet").removeAttr("disabled");
        $("#ramp_length_inches").removeAttr("disabled");
        $("#ramp_height_feet").removeAttr("disabled");
        $("#ramp_height_inches").removeAttr("disabled");
        $("#ratio").removeAttr("disabled");
    }

    function toggleUnit() {
        metric = $("#units").prop("checked");
        if (metric) {
            $("#ramp_height_feet_label").html("Meters");
            $("#ramp_length_feet_label").html("Meters");
            $(".feet").attr("class", "input-field col s12 feet");
            $(".inches").hide();
        } else {
            $("#ramp_height_feet_label").html("Feet");
            $("#ramp_length_feet_label").html("Feet");
            $(".feet").attr("class", "input-field col s6 feet");
            $(".inches").show();
        }
    }

    calc();
});
