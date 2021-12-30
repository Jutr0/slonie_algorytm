"use strict";
exports.__esModule = true;
var readline = require("readline");
var quantity;
var inputValues = [];
var currentInput = 0;
//handle input 
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('', function (answer) {
    quantity = +answer;
});
rl.on('line', function (line) {
    inputValues[currentInput] = line.split(' ').map(function (m) { return +m; });
    if (currentInput === 2)
        rl.close();
    currentInput++;
});
rl.on('close', function () {
    console.log(exports.calculateMinEffort(quantity, inputValues[0], inputValues[1], inputValues[2]));
});
//function from exercise
exports.calculateMinEffort = function (quantity, masses, startPosition, endPosition) {
    var permutation = [];
    var used = [];
    var cyclesNumber = 0;
    var cycles = [];
    for (var i = 0; i < quantity; i++) {
        used.push(false);
        permutation[endPosition[i]] = startPosition[i];
    }
    used.push(false);
    for (var i = 1; i <= quantity; i++) {
        if (!used[i]) {
            cycles[cyclesNumber] = [];
            cyclesNumber++;
            var x = i;
            while (!used[x]) {
                used[x] = true;
                cycles[cyclesNumber - 1].push(x);
                x = permutation[x];
            }
        }
    }
    var cyclesSum = [];
    var cyclesMin = [];
    var min = Infinity;
    var _loop_1 = function (i) {
        cyclesSum[i] = 0;
        cyclesMin[i] = Infinity;
        cycles[i].forEach(function (step) {
            cyclesSum[i] += masses[step - 1];
            cyclesMin[i] = Math.min(cyclesMin[i], masses[step - 1]);
        });
        min = Math.min(min, cyclesMin[i]);
    };
    for (var i = 0; i < cyclesNumber; i++) {
        _loop_1(i);
    }
    var result = 0;
    for (var i = 0; i < cyclesNumber; i++) {
        var firstMethod = cyclesSum[i] + (cycles[i].length - 2) * cyclesMin[i];
        var secondMethod = cyclesSum[i] + cyclesMin[i] + (cycles[i].length + 1) * min;
        result += Math.min(firstMethod, secondMethod);
    }
    return result;
};
