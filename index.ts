import * as readline from "readline";

let quantity: number;
const inputValues: number[][] = []

let currentInput = 0;


//handle input 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.question('', (answer) => {

    quantity = +answer;
})
rl.on('line', (line) => {

    inputValues[currentInput] = line.split(' ').map(m => +m);
    if (currentInput === 2) rl.close()
    currentInput++;

})
rl.on('close', () => {

    console.log(calculateMinEffort(quantity, inputValues[0], inputValues[1], inputValues[2]))

})

//function from exercise
export const calculateMinEffort = (
    quantity: number,
    masses: number[],
    startPosition: number[],
    endPosition: number[]
) => {

    const permutation: number[] = [];
    const used: boolean[] = [];
    let cyclesNumber = 0;
    const cycles: number[][] = [];


    
    for (let i = 0; i < quantity; i++) {
        used.push(false)
        permutation[endPosition[i]] = startPosition[i]
    }
    used.push(false)

    for (let i = 1; i <= quantity; i++) {

        if (!used[i]) {

            cycles[cyclesNumber] = []
            cyclesNumber++;
            let x = i;

            while (!used[x]) {

                used[x] = true;
                cycles[cyclesNumber - 1].push(x)
                x = permutation[x]

            }
        }
    }

    const cyclesSum: number[] = [];
    const cyclesMin: number[] = []
    let min = Infinity;

    for (let i = 0; i < cyclesNumber; i++) {

        cyclesSum[i] = 0;
        cyclesMin[i] = Infinity;

        cycles[i].forEach((step) => {
            cyclesSum[i] += masses[step - 1];
            cyclesMin[i] = Math.min(cyclesMin[i], masses[step - 1]);
        })

        min = Math.min(min, cyclesMin[i]);

    }

    let result = 0;

    for (let i = 0; i < cyclesNumber; i++) {

        const firstMethod = cyclesSum[i] + (cycles[i].length - 2) * cyclesMin[i];
        const secondMethod = cyclesSum[i] + cyclesMin[i] + (cycles[i].length + 1) * min;
        result += Math.min(firstMethod, secondMethod);

    }

    return result;
}