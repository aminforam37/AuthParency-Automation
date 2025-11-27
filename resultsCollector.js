// resultsCollector.js
const testResults = [];

function addResult(result) {
    testResults.push(result);
}

function getResults() {
    return testResults;
}

export { addResult, getResults };
