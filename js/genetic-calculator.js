document.getElementById("cal-btn").addEventListener("click", calculate);

var speed = 10;

function calculate() {
    // Calculation
    var muscleInsertion = muscleInsertionCal();
    var d4 = (($("#weight-input").val() / 2.2046) * (1 - ($("#bodyfat-input").val() / 100)) / Math.pow(($("#height-select :selected").val() / 100), 2));
    console.log(muscleInsertion);

    // Check Value
    if(isNaN(muscleInsertion))
        muscleInsertion = 0;

    // Insert Values
    $("#muscle-insertion").val(muscleInsertion + " / 30");

    setResultValue(0, muscleInsertion); 
}

function muscleInsertionCal() {
    return parseInt($("#abs-select :selected").val()) + parseInt($("#chest-select :selected").val()) + parseInt($("#bicep-select :selected").val()) + parseInt($("#deltoid-select :selected").val());
}

/* A recursive function to increase the number */
function setResultValue(index, result) {
    var label = document.getElementById("result-value");

    if (index <= result) {
        label.innerHTML = index;

        if(index === 0)
            label.className = "bad";
        else if(index === 25)
            label.className = "average";
        else if(index === 50)
            label.className = "good";
        else if(index === 70)
            label.className = "great";
        else if(index === 90)
            label.className = "excellent";

        setTimeout(function() {
            // Delay a bit before calling the function again.
            setResultValue(index + 1, result);
        }, speed);
    }
}