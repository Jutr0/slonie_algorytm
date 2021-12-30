const {
    calculateMinEffort
} = require("..")
var readlines = require('n-readlines');

const getInputValues = (inputLiner) => {
    const quantity = +inputLiner.next().toString('ascii');
    const masses = inputLiner.next().toString('ascii').split(' ').map(n => +n);
    const startPosition = inputLiner.next().toString('ascii').split(' ').map(n => +n);
    const endPosition = inputLiner.next().toString('ascii').split(' ').map(n => +n);
    
    return [quantity, masses, startPosition, endPosition]
}
const files = ['slo1', 'slo1ocen', 'slo2', 'slo2ocen', 'slo3', 'slo3ocen', 'slo4','slo4ocen', 'slo5','slo6','slo7','slo8a','slo8b','slo9a','slo9b','slo10a','slo10b']

describe('should pass all test cases', () => {


    test('default', () => {

        const quantity = 6
        const masses = [2400, 2000, 1200, 2400, 1600, 4000]
        const startPosition = [1, 4, 5, 3, 6, 2]
        const endPosition = [5, 3, 2, 4, 6, 1]

        const result = calculateMinEffort(quantity, masses, startPosition, endPosition)

        expect(result).toBe(11200)

    })

    files.forEach((value) => {
        test(value, () => {

            let inputLiner = new readlines(`./testCases/${value}.in`);
            let outputLiner = new readlines(`./testCases/${value}.out`);
    
            const [quantity, masses, startPosition, endPosition] = getInputValues(inputLiner)
                    const expectedOutput = +outputLiner.next().toString('ascii')
    
            const output = calculateMinEffort(quantity, masses, startPosition, endPosition)
    
            expect(output).toEqual(expectedOutput)
        })
     })

})