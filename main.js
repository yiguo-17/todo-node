const fs = require('fs');
const list = fs.readFileSync('./todos.csv',{encoding:'utf-8'});
const loadToDo = function(str){
    const tasks = [];
    const lines = str.split('\n');
    for (const line of lines){
        tasks.push(line.split(','));
    }
    return tasks;
}
const displayToDo = function(arr){
    let display = '';
    for(let i = 0; i< arr.length; i++){
        const task = arr[i].join(' - ')
        display += (`${i+1}. ${task} \n`)
    }
    return display;
}
let tasks = loadToDo(list);
let currentList = displayToDo(tasks);
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
const remove = function(str){
    tasks.splice(Number(str)-1,1)
}
const complete = function(str){
    tasks[Number(str)-1][1].push('complete');
}
const uncomplete = function(str){
    tasks[Number(str)-1][1]='uncomplete';
}
const handleMenu = function(str){
    if(str === '1'){interface.question(newOne,add(process.argv.slice(2)))}
    else if(str ==='2'){interface.question(removeOne,remove(process.argv[2]))}
    else if(str ==='3'){interface.question(finish,complete(process.argv[2]))}
    else if(str ==='4'){interface.question(unfinished,uncomplete(process.argv[2]))}
    else {console.log('Quitting!');
    interface.close();}
}
const saveToDo = function(arr){
    const newArr = '';
    for(const subArr of Arr){
        subTodo = subArr.join(',')
        newArr += subTodo +'\n'
    }
}
interface.question(menu,handleMenu);


