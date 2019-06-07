import { performance } from 'perf_hooks';
import { TestSubject, TestResult } from './interfaces';

/**
 * PerformanceTest
 */
export class PerformanceTest {
    private iterations = 100;
    private testResult: Array<TestResult> = [];

    constructor(private testSubject: TestSubject | Array<TestSubject>) {
    }

    run() {
        if (Array.isArray(this.testSubject)) {
            for (let i = 0; i < this.testSubject.length; i++) {
                this.testIterator(this.testSubject[i]);
            }
        } else {
            this.testIterator(this.testSubject);
        }

        return this.testResult;
    }

    private testIterator({ fn, args, options }: TestSubject) {
        let durationArr = [], t0, t1;
        let lowestTime: number;
        let highestTime: number;
        const maxIterations = options.iterations || this.iterations;

        for (let i = 0; i < maxIterations; i++) {
            // run
            t0 = performance.now();
            fn(...args);
            t1 = performance.now();

            // calculate and store run time
            const runTime = +(t1 - t0);
            durationArr.push(runTime);

            // min run time
            if (!lowestTime || runTime < lowestTime) {
                lowestTime = this.toNumber(runTime);
            }

            // max run time
            if (!highestTime || runTime > highestTime) {
                highestTime = this.toNumber(runTime);
            }
        }

        // calculate average
        const durationsSum = durationArr.reduce((a, b) => a + b, 0);
        const averageTime = this.toNumber(durationsSum / durationArr.length);

        this.testResult.push(
            <TestResult>{
                functionName: fn.name,
                iterationsRun: maxIterations,
                averageTime,
                lowestTime,
                highestTime
            }
        );
    }

    private toNumber(num: number, digits: number = 4) {
        return +(num.toFixed(digits));
    }
}

export const performanceTest = (testSubject) => new PerformanceTest(testSubject);
