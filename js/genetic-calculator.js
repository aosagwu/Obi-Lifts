document.getElementById("cal-btn").addEventListener("click", calculate);

let speed = 100;

function calculate() {
    // Calculation
    var muscleMass          = muscleMassCal();
    var boneStructure       = boneStructureCal()
    var muscleInsertion     = muscleInsertionCal();
    var bodyFatDistribution = bodyFatDistributionCal();
    var metabolism          = metabolismCal();

    // Check Value
    if(isNaN(muscleMass))
        muscleMass = 0;

    if(isNaN(boneStructure))
        boneStructure = 0;

    if(isNaN(muscleInsertion))
        muscleInsertion = 0;

    if(isNaN(bodyFatDistribution))
        bodyFatDistribution = 0;

    if(isNaN(metabolism))
        metabolism = 0;

    // Insert Values
    $("#muscle-mass").val(muscleMass + " / 30");
    $("#bone-structure").val(boneStructure + " / 20");
    $("#muscle-insertion").val(muscleInsertion + " / 30");
    $("#bodyfat-distribution").val(bodyFatDistribution + " / 10");
    $("#metabolism").val(metabolism + " / 10");

    // Get Result
    var result = muscleMass + boneStructure + muscleInsertion + bodyFatDistribution + metabolism;

    // Set Speed
    speed = Math.abs(result - 90);

    // Display Result
    setResultValue(0, result); 
}

function getWristValue() {
    var wristCircumference = $("#wrist-input").val();

    if(wristCircumference < 6.47)
        return 0;
    else if(wristCircumference >= 6.47 && wristCircumference <= 6.6)
        return 1;
    else if(wristCircumference > 6.6 && wristCircumference <= 6.79)
        return 2;
    else if(wristCircumference > 6.79 && wristCircumference <= 6.95)
        return 3;
    else if(wristCircumference > 6.95 && wristCircumference <= 7.13)
        return 4;
    else 
        return 5;
}

function getAnkleValue() {
    var ankleCircumference = $("#ankle-input").val();

    if(ankleCircumference < 8.14)
        return 0;
    else if(ankleCircumference >= 8.14 && ankleCircumference <= 8.36)
        return 1;
    else if(ankleCircumference > 8.36 && ankleCircumference <= 8.65)
        return 2;
    else if(ankleCircumference > 8.65 && ankleCircumference <= 8.91)
        return 3;
    else if(ankleCircumference > 8.91 && ankleCircumference <= 9.22)
        return 4;
    else 
        return 5;
}

function shoulderWaistValue() {
    var shoulderWaistValue = $("#shoulder-input").val() / $("#waist-input").val();

    if(shoulderWaistValue < 1.5)
        return 0;
    else if(shoulderWaistValue >= 1.5 && shoulderWaistValue <= 1.6)
        return 2;
    else if(shoulderWaistValue > 1.6 && shoulderWaistValue <= 1.7)
        return 4;
    else if(shoulderWaistValue > 1.7 && shoulderWaistValue <= 1.8)
        return 6;
    else if(shoulderWaistValue > 1.8 && shoulderWaistValue <= 1.9)
        return 8;
    else
        return 10;
}

function muscleMassCal() {
    var ffmi = parseInt(($("#weight-input").val() / 2.2046) * (1 - ($("#bodyfat-input").val() / 100)) / Math.pow(($("#height-select :selected").val() / 100), 2));

    console.log(ffmi);
    if(ffmi < 18)
        return 0;
    else if(ffmi >= 18 && ffmi <= 20)
        return 5;
    else if(ffmi > 20 && ffmi <= 21)
        return 10;
    else if(ffmi > 21 && ffmi <= 22)
        return 15;
    else if(ffmi > 22 && ffmi <= 24)
        return 20;
    else if(ffmi > 24 && ffmi <= 25)
        return 25;
    else
        return 30;
}

function boneStructureCal() {
    return getWristValue() + getAnkleValue() + shoulderWaistValue();
}

function muscleInsertionCal() {
    return parseInt($("#abs-select :selected").val()) + parseInt($("#chest-select :selected").val()) + parseInt($("#bicep-select :selected").val()) + parseInt($("#deltoid-select :selected").val());
}

function bodyFatDistributionCal() {
    return parseInt($("#bodyfat-select :selected").val());
}

function metabolismCal() {
    return parseInt($("#metabolism-select :selected").val());
}

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
            setResultValue(index + 1, result);
        }, speed);
    }
}