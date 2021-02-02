let data = [
    {
        "timestamp": "2021-01-28T03:34:37.039Z",
        "loyaltyAndUnderstanding": 5,
        "anExcitingPersonality": 5,
        "emotionalStability": 5,
        "similarities": 1,
        "physicalAttractiveness": 3,
        "incomeearningPotential": 2
    },
    {
        "timestamp": "2021-01-28T03:39:14.187Z",
        "loyaltyAndUnderstanding": 5,
        "anExcitingPersonality": 4,
        "emotionalStability": 4,
        "similarities": 2,
        "physicalAttractiveness": 5,
        "incomeearningPotential": 5
    },
    {
        "timestamp": "2021-01-28T04:02:34.369Z",
        "loyaltyAndUnderstanding": 5,
        "anExcitingPersonality": 4,
        "emotionalStability": 5,
        "similarities": 3,
        "physicalAttractiveness": 3,
        "incomeearningPotential": 3
    },
    {
        "timestamp": "2021-01-28T04:05:17.319Z",
        "loyaltyAndUnderstanding": 4,
        "anExcitingPersonality": 3,
        "emotionalStability": 4,
        "similarities": 2,
        "physicalAttractiveness": 3,
        "incomeearningPotential": 3
    },
    {
        "timestamp": "2021-01-28T04:32:47.816Z",
        "loyaltyAndUnderstanding": 5,
        "anExcitingPersonality": 4,
        "emotionalStability": 4,
        "similarities": 3,
        "physicalAttractiveness": 3,
        "incomeearningPotential": 4
    },
    {
        "timestamp": "2021-01-28T07:32:50.132Z",
        "loyaltyAndUnderstanding": 5,
        "anExcitingPersonality": 5,
        "emotionalStability": 4,
        "similarities": 5,
        "physicalAttractiveness": 4,
        "incomeearningPotential": 3
    },
    {
        "timestamp": "2021-01-28T10:21:48.431Z",
        "loyaltyAndUnderstanding": 5,
        "anExcitingPersonality": 5,
        "emotionalStability": 4,
        "similarities": 3,
        "physicalAttractiveness": 4,
        "incomeearningPotential": 4
    },
    {
        "timestamp": "2021-01-29T03:22:18.935Z",
        "loyaltyAndUnderstanding": 5,
        "anExcitingPersonality": 5,
        "emotionalStability": 4,
        "similarities": 4,
        "physicalAttractiveness": 4,
        "incomeearningPotential": 4
    },
    {
        "timestamp": "2021-01-29T03:30:15.565Z",
        "loyaltyAndUnderstanding": 3,
        "anExcitingPersonality": 4,
        "emotionalStability": 4,
        "similarities": 4,
        "physicalAttractiveness": 4,
        "incomeearningPotential": 2
    },
    {
        "timestamp": "2021-01-31T14:21:07.489Z",
        "loyaltyAndUnderstanding": 5,
        "anExcitingPersonality": 4,
        "emotionalStability": 4,
        "similarities": 3,
        "physicalAttractiveness": 3,
        "incomeearningPotential": 5
    }
]


// the function dates a data
// arrayn as an argument
function averageData(data){
  // new empty array to be filled
  // with data in new structure
  let newData = [];
  // assuming each data point has the same
  // keys/categories, we extract an array of them from the
  // first data point in the array
  // in class we changed it to the last element instead
  // as the first one did not have all the categories filled out
  // there is more thorough ways to do this, but for out purposes
  // now, this will be enough
  let keys = Object.keys(data[0]);
  // now we loop over the keys/categories
  for(let i = 0; i < keys.length; i++){
    // store the current key/category in
    // a variable:
    let key = keys[i];
    // now we will loop over each data point
    // in the data set, check if it has a value
    // for the key/category and add them to
    // a total sum variable
    // as well as count the occurences in order to
    // calulate the averae in the end
    let sum = 0;
    let num = 0;
    for(let j = 0; j < data.length; j++){
      let datum = data[j];
      // check if the key exists
      // for this datapoint
      if(key in datum){
        // add to sum
        sum += datum[key];
        // increase count
        num++;
      }
    }
    // now calculate the average
    let avg = sum/num;
    // make sure the value is a number
    // (some value might be strings)
    if(!isNaN(avg)){
      // create an object with both the average
      // and also the number of measurements that
      // went into the average
      let newDataPoint = {"name": key, "average": avg, 'numMeasurements': num};
      // add the new datapoint to the new data array
      newData.push(newDataPoint);
    }
  }
  // return everything when it is done
  return newData;
}


// here we use the function to transform the data
let transformedData = averageData(data);


// log things to the console as you go to make sure things
// are behaving as intended. I see the data looks good
// console.log(transformedData);


// Loop over the data, once for each datapoint.
// in my case the loop loops 6 times because we have
// 6 data objects in my dataset.
for (let i = 0; i < transformedData.length; i++){
  // get the item we deal with at this iteration
  let datapoint = transformedData[i];

  // get the name of the current
  // item by "digging" into the datapoint object
  // and the average liking value
  let object = datapoint.name;
  let average = datapoint.average;
  console.log(object, average);

  let bar = document.getElementById("bar"+i);

  console.log("bar"+i);
  console.log(bar);
  bar.setAttribute("data-value", average);
  bar.setAttribute("data-percentage", average * 20);
}
