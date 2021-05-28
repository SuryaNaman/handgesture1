prediction_1 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "jpg",
    jpg_quality: 90
})

var camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snap() {
    Webcam.snap(function(data_url) {
        document.getElementById("Result").innerHTML = '<img id="captured_image" src="' + data_url + '"/>';
    });
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/jW_gQpFwp/model.json", modelLoaded);

function modelLoaded() {
    console.log("model loaded");
}

function speech() {
    var synth = window.speechSynthesis;
    data1 = "The First Prediction Is " + prediction_1;
    var utterthis = new SpeechSynthesisUtterance(data1);
    synth.speek(utterthis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log("error found");
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;

        prediction_1 = results[0].label;

        speech();

        if (results[0].label == "superb") {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if (results[0].label == "yo") {
            document.getElementById("update_emoji").innerHTML = "&#129304;";
        }
        if (results[0].label == "best") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
    }
}