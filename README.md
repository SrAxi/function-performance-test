# function-performance-test
Tests the performance of given functions returning `averageTime`, `lowestTime` and `highestTime`.

### How to use
```javascript
import { performanceTest } from 'function-performance-test';

// Dummy test functions
function test(a, b) {
    return a + b;
}

function test1(a, b) {
    return a + b;
}

// Single function test
const testSubject1 = { 
    fn: test, 
    args: [2, 'a'], 
    options: { 
        iterations: 5,
    } 
};

const pt1 = performanceTest(testSubject1);
const result1 = pt1.run();

// result1
// [
//     {
//         functionName: 'test',
//         iterationsRun: 5,
//         averageTime: 0.0187,
//         lowestTime: 0.0081,
//         highestTime: 0.0575
//     }
// ]


// Multiple function test
const testSubject2 = [
    { fn: test, args: [3, 'b'], options: { iterations: 3 } },
    { fn: test1, args: [4, 'c'], options: { iterations: 4 } }
];

const pt2 = performanceTest(testSubject2);
const result2 = pt2.run();

// result2
// [
//     {
//         functionName: 'test',
//         iterationsRun: 3,
//         averageTime: 0.0102,
//         lowestTime: 0.0087,
//         highestTime: 0.0125
//     },
//     {
//         functionName: 'test1',
//         iterationsRun: 4,
//         averageTime: 0.0119,
//         lowestTime: 0.0087,
//         highestTime: 0.0132
//     }
// ]
```

### Interfaces
```typescript
interface Options {
    iterations?: number;
}

export interface TestSubject {
    fn: Function;
    args?: Array<any>;
    options?: Options;
}

export interface TestResult {
    functionName: string;
    iterationsRun: number;
    averageTime: number;
    lowestTime: number;
    highestTime: number;
}
```
