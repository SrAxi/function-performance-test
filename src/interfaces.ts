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
