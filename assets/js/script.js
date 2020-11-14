// Setup values
var stateSubmit = $("#state-submit");
var clearSubmit = $("#clear-submit");

// Current Data Container
var container = $("#container");
console.log(container);
var date = $("<h3>");
var state = $("<h3>");
var death = $("<h3>");
var hospitalized = $("<h3>");
var positive = $("<h3>");
var negative = $("<h3>");
var positiveIncrease = $("<h3>");
var negativeIncrease = $("<h3>");
var dataQualityGrade = $("<h3>");

//Historic Data Container
var containerTwo = $("#container-two");
var dateTwo = $("<h3>");
var stateTwo = $("<h3>");
var deathTwo = $("<h3>");
var hospitalizedTwo = $("<h3>");
var positiveTwo = $("<h3>");
var negativeTwo = $("<h3>");
var positiveIncreaseTwo = $("<h3>");
var negativeIncreaseTwo = $("<h3>");
var dataQualityGradeTwo = $("<h3>");


// Append Current Items
function appendCurrent(){
    container.append(
        date,
        state,
        death,
        hospitalized,
        positive,
        negative,
        positiveIncrease,
        negativeIncrease,
        dataQualityGrade);
}

//Append Historic Items
function appendHistoric(){
  containerTwo.append(
      dateTwo,
      stateTwo,
      deathTwo,
      hospitalizedTwo,
      positiveTwo,
      negativeTwo,
      positiveIncreaseTwo,
      negativeIncreaseTwo,
      dataQualityGradeTwo);
}

// Empty Values
function removeItems(){
    container = $("#container");
    date = date.text(" ");
    state = state.text(" ");
    death = death.text(" ");
    hospitalized = hospitalized.text(" ");
    positive = positive.text(" ");
    negative = negative.text(" ");
    positiveIncrease = positiveIncrease.text(" ");
    negativeIncrease = negativeIncrease.text(" ");
    dataQualityGrade = dataQualityGrade.text(" ");
}

// Call API's
function handleAPI(){
    var states = $("#user-search").val();
  console.log(states);
  var queryURL =
    "https://api.covidtracking.com/v1/states/" + states + "/current.json";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    // Ajax Call for Searched Current Values
    date.text("Date: " + response.date);
    state.text("State: " + response.state);
    death.text("Death: " + response.death);
    hospitalized.text("Hospitalized: " + response.hospitalized);
    positive.text("Positive: " + response.positive);
    negative.text("Negative: " + response.negative);
    positiveIncrease.text(
      "Positive Increase: " + response.positiveIncrease
    );
    negativeIncrease.text(
      "Negative Increase: " + response.negativeIncrease
    );
    dataQualityGrade.text(
      "Data Qualtiy Grade: " + response.dataQualityGrade
    );
appendCurrent(response);
    //Ajax call for Searched Historic Values
    var dates = $("#user-date").val();
    console.log(dates);
    var queryURL =
      "https://api.covidtracking.com/v1/states/" +
      states +
      "/" +
      dates +
      ".json";
    console.log(typeof dates == "string");
    if (dates == "") {
      console.log("You need to add a date bud");
      return
    } else {
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (responseTwo) {
        console.log(responseTwo);
        dateTwo.text("Date: " + responseTwo.date);
        stateTwo.text("State: " + responseTwo.state);
        deathTwo.text("Death: " + responseTwo.death);
        hospitalizedTwo.text("Hospitalized: " + responseTwo.hospitalized);
        positiveTwo.text("Positive: " + responseTwo.positive);
        negativeTwo.text("Negative: " + responseTwo.negative);
        positiveIncreaseTwo.text(
          "Positive Increase: " + responseTwo.positiveIncrease
        );
        negativeIncreaseTwo.text(
          "Negative Increase: " + responseTwo.negativeIncrease
        );
        dataQualityGradeTwo.text(
          "Data Qualtiy Grade: " + responseTwo.dataQualityGrade
        );
        appendHistoric();
      });
    }
  });
}

// // News Handler
// function newsHandler(){
//   var queryURL =
//   "http://newsapi.org/v2/everything?q=covid&sortBy=popularity&apiKey=7906e2c88174490ca03bc87497f4ba8a";
//   console.log(queryURL);
//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then(function (response) {
//     console.log(response);
//     // date.text("Date: " + response.date);
//   });
// };

stateSubmit.on("click", function (event) {
  event.preventDefault();
  handleAPI();
//   newsHandler();
});
clearSubmit.on("click", function (event) {
    event.preventDefault();
    removeItems();
  });
