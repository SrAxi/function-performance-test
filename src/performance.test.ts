import { PerformanceTest, performanceTest } from './performance';
import { TestResult } from './interfaces';

function test(a, b) {
    return a + b;
}
function test1(a, b) {
    return a + b;
}

function instanceOfTestResult(object: any): object is TestResult {
    return 'functionName' in object;
}

describe('performanceTest', () => {
    it('should work as expected for single function test', () => {
        const pt = performanceTest({ fn: test, args: [2, 'a'], options: { iterations: 5 } });
        const result = pt.run();

        expect(pt instanceof PerformanceTest).toBe(true);
        expect(Array.isArray(result)).toBe(true);
        expect(instanceOfTestResult(result[0])).toBe(true);
        expect(result[0].functionName).toEqual('test');
    });
    it('should work as expected for multiple function test', () => {
        const pt = performanceTest([
            { fn: test, args: [3, 'b'], options: { iterations: 3 } },
            { fn: test1, args: [4, 'c'], options: { iterations: 4 } }
        ]);
        const result = pt.run();

        expect(pt instanceof PerformanceTest).toBe(true);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(instanceOfTestResult(result[0])).toBe(true);
        expect(instanceOfTestResult(result[1])).toBe(true);
        expect(result[0].functionName).toEqual('test');
        expect(result[1].functionName).toEqual('test1');
    });
});
