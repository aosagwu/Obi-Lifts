document.getElementById("cal-btn").addEventListener("click", calculate);

var speed = 10;

function calculate() {
    // Calculation
    setResultValue(0, 85); 
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