const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    // 自动生成一个文件
    prompt: 'OHAI>'
});

const proHint = `
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See \`npm help json\` for definitive documentation on these fields
and exactly what they do.

Use \`npm install <pkg> --save\` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
`
console.log(proHint);

let index = 0;
const quesArr = ['project name', 'version', 'author'];
const defaultAnswers = ['name', '1.0.0', 'none'];
const answers = [];
function createPackageJSON() {
    // json怎么准备？
    var map = {};
    quesArr.forEach((question, index) => {
        map[question] = answers[index];
    });

    fs.writeFileSync('./package1.json', JSON.stringify(map, null, 4));
}
function runQuestionLoop() {
    if (index === quesArr.length) {
        createPackageJSON();
        rl.close();
        return;
    }
    let defaultAnswer = defaultAnswers[index];
    let question = quesArr[index] + ':(' + defaultAnswer + ')';
    rl.question(question, function(answer) {
        answers.push(answer || defaultAnswer);
        index++;
        runQuestionLoop();
    })
}
runQuestionLoop();
