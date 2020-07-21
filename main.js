const fs = require('fs');
const list = fs.readFileSync('./todos.csv',{encoding:'utf-8'});
const tasks = [];
const lines = list.split('\n');
for (const line of lines){
    tasks.push(line.split(','));
}
const readline = require('readline');
const { toUnicode } = require('punycode');
const interface = readline.createInterface({input: process.stdin, output: process.stdout});



const menu = `
Your options are:

1. Add a todo.
2. Remove a todo.
3. Mark a todo completed.
4. Mark a todo uncompleted.
5. Quit.

`;
const newOne = `What's your new task?`;
const removeOne = `Which task need to be removed?`
const finish = `Congratulation, Which task has been done?`
const unfinished = `Which task still needs more effort?`
const add = function(arr){
    const newTask = [];
    str = arr.join(' ');
    newTask.push(str);
    newTask.push('uncomplete');
    tasks.push(newTask)
}
const remove = function(arr){
    tasks.splice(Number(arr)-1,1)
}
const complete = function(arr){
    tasks[Number(arr)-1][1]='complete';
}
const uncomplete = function(arr){
    tasks[Number(arr)-1][1]='uncomplete';
}
const handleMenu = function(str){
    if(str === '1'){interface.question(newOne,add(process.argv.slice(2)))}
    else if(str ==='2'){interface.question(removeOne,remove(process.argv.slice(2)))}
    else if(str ==='3'){interface.question(finish,complete(process.argv.slice(2)))}
    else if(str ==='4'){interface.question(unfinished,uncomplete(process.argv.slice(2)))}
    else {console.log('Are you quitting?');
    interface.close();}
}

interface.question(menu,handleMenu);


