import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
let worldCup2014 = fifaData.filter(i => i["Year"] === 2014);

//(a) Home Team name for 2014 world cup final
console.log(worldCup2014[0]["Home Team Name"], "::2014 home team");

//(b) Away Team name for 2014 world cup final
console.log(worldCup2014[0]["Away Team Name"], "::2014 away team");

//(c) Home Team goals for 2014 world cup final
console.log(worldCup2014[0]["Home Team Goals"], "::2014 home team goals");

//(d) Away Team goals for 2014 world cup final
console.log(worldCup2014[0]["Away Team Goals"], "::2014 Away Team goals");

//(e) Winner of 2014 world cup final */
if (worldCup2014[0]["Away Team Goals"] > worldCup2014[0]["Home Team Goals"]) {
    console.log(worldCup2014[0]["Away Team Name"], "::2014 winner");
} else {
    console.log(worldCup2014[0]["Home Team Name"], "::2014 winner");
}


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/


function getFinals(data) {
    let finalStage = data.filter(i => i["Stage"] === "Final");
    return finalStage;
}
console.log(getFinals(fifaData), "::getfinals function");



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(arr, cb,) {
    let year = cb(arr).map(i => i.Year);
    return year;
}

console.log(getYears(fifaData, getFinals,))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */

function getWinners(arr, cb,) {
    let winners = cb(arr).map(function (i) {
        if (i["Home Team Goals"] > i["Away Team Goals"]) {
            return i["Home Team Name"];
        } else {
            return i["Away Team Name"];
        }
    });
    return winners;
}

console.log(getWinners(fifaData, getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(arr, cb, cb2, cb3) {
    let winningYears = cb(arr, cb3);
    let winningTeams = cb2(arr, cb3);
    let yearAndWinners = [];

    for (let i = 0; i < cb(arr, cb3).length; i++) {
        yearAndWinners.push(`In ${winningYears[i]}, ${winningTeams[i]} won the world cup!`);
    }

    return yearAndWinners;
}

console.log(getWinnersByYear(fifaData, getYears, getWinners, getFinals), "::winners by year function");


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(arr, cb) {
    //     //let AddedGoalFromFinals = cb(arr).map(function (i) { return i["Home Team Goals"] + i["Away Team Goals"] });
    let totalGoalsInFinals = cb(arr).reduce((total, item) => {
        return total += (item["Home Team Goals"] + item["Away Team Goals"])
    }, 0);

    return Math.round((totalGoalsInFinals / cb(arr).length) * 100) / 100;
}

console.log(getAverageGoals(fifaData, getFinals), ":: this is getAvrageGoals");


///help from slack but still doesn't work
// function getAverageGoals(arr) {
//     let totalGoalsInFinals = arr.reduce((total, item) => {
//         return total += (item["Home Team Goals"] + item["Away Team Goals"])
//     }, 0);
//     return (totalGoalsInFinals / arr.length).toFixed(2);
// }
// console.log(getAverageGoals(fifaData(getFinals)), ":: this is getAvrageGoals");




/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 
 
Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, cb, teamInitials) {
    // map winners initials to new array
    // reduce that array to tell you how many times the teamInitals are in that array

    let winners = cb(data).map(function (i) {
        if (i["Home Team Goals"] > i["Away Team Goals"]) {
            return i["Home Team Initials"];
        } else {
            return i["Away Team Initials"];
        }

    });
    console.log(winners, "::winners in initial form");

    let countryWins = winners.reduce((wins, i) => {
        if (teamInitials === i) {
            wins += 1;
        }
        return wins;
    }, 0);

    // let winsArr = [];
    // for (let i = 0; i < winners.length; i++) {
    //     if (teamInitials === winners[i]) {
    //         winsArr.push(winners[i]);
    //     }
    // }
    // let countryWins = winsArr.length

    return countryWins;

}

console.log(getCountryWins(fifaData, getFinals, 'ITA'), "::get Country Wins funciton");



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */
// reduce to:   if this teams overall final goals / by their appearance in the finals the most then return that team

// function getGoals(data) {

// Get Winner and Losers of Finals Separate and there goals separate
// let winnersOfFinals = [];
// let losersOfFinals = [];
// winnersOfFinals = data.map(function (i) {
//     if (i["Home Team Goals"] > i["Away Team Goals"]) {
//         return { "Team Name": i["Home Team Name"], "Goals": i["Home Team Goals"] };
//     } else {
//         return { "Team Name": i["Away Team Name"], "Goals": i["Away Team Goals"] };
//     }
// });

// losersOfFinals = data.map(function (i) {
//     if (i["Home Team Goals"] < i["Away Team Goals"]) {
//         return { "Team Name": i["Home Team Name"], "Goals": i["Home Team Goals"] };
//     } else {
//         return { "Team Name": i["Away Team Name"], "Goals": i["Away Team Goals"] };
//     }
// });

//How many times has that team been in the finals


// Reduce: If losers overall appearance  divided by there overall total of goals is the higher than everyone else return them
// winners Goals

// winnersOfFinals.reduce((AverageGoalsScoredInFinals, i => {
//     if ((i["Goals"])/) {

//     }

// }), 0);

//losers goals



// if Best Loser is > Best winner return Best Loser

// }
// }

// console.log(getGoals(fifaData(getFinals)));


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo() {
    console.log('its working');
    return 'bar';
}
export default {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
