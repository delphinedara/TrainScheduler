

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAjOF-M7vfIi2Cmlr9akDdWsrAxGe8LtbQ",
    authDomain: "trainscheduler-609c4.firebaseapp.com",
    databaseURL: "https://trainscheduler-609c4.firebaseio.com",
    projectId: "trainscheduler-609c4",
    storageBucket: "",
    messagingSenderId: "170165495933"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input (trainName, trainDestination, trainStart & trainFrequency )
  var trainName = $("#train-name-input").val().trim();//train name
  var trainDestination = $("#destination-input").val().trim(); //destination
  var trainStart= moment($("#start-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
  var trainFrequency = $("#frequency-input").val().trim();


  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequency
  };

  // Uploads trains data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);
  

  // Alert
  alert("Added Train Successfully!");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input"). val("");
  $("#frequency-input").val("");
  
});

// Creating Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot. val ().start;
  var trainFrequency = childSnapshot.val().frequency;
  
  // Check console if train info is correct
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFrequency);

  // Prettify the frequency
 // var trainFrequencyPretty = moment.unix(trainFrequency).format("minutes");

  // Current Time
  var currentTime = moment();
   
  // Difference between the times
    var diffTime = moment().diff(moment.unix(trainStart), "minutes");

  //Time apart (remainder) 
    var tRemainder = moment().diff(moment.unix(trainStart), "minutes") % trainFrequency;
  // Minute Until Train
    var tMinutesTillTrain = trainFrequency- tRemainder;

  // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
  
  //Console log ---testing
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));
    console.log("Difference between times: " + diffTime);
    console.log("Minutes Till Train: " + tMinutesTillTrain);
    console.log("Arrival Time: " + nextTrain);

  // Add train data to table
  $("#train-table > tbody").append ("<tr><td>" +trainName + "</td><td>" + trainDestination 
  +"</td><td>" + trainFrequency + "</td><td>" + nextTrain +
  "</td><td>" + tMinutesTillTrain + "</td></tr>")
 
  }); 