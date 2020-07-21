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
    const newArr = [];
    for(const subArr of arr){
        newArr.push(subArr)
    }
    for(const subAr of newArr){
        if(subAr[1]==='complete'){subAr[1]='✅'}
        if(subAr[1]==='uncomplete'){subAr[1]='✖'}
    }
    for(let i = 0; i< arr.length; i++){
        const task = newArr[i].join(' - ')
        display += (`${i+1}. ${task} \n`)
    }
    return display;
}
let tasks = loadToDo(list);
let original = displayToDo(tasks);
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
const saveToDo = function(arr){
    let newData = '';
    const newArr =[];
    for(const subArr of arr){
        let subTodo = subArr.join(',')
        newArr.push(subTodo);
    }
    newData = newArr.join('\n');
    fs.writeFileSync('./todos.csv',newData);
    console.log('Quitting!');
    interface.close();
}
const newOne = `What's your new task?`;
const removeOne = `Which task need to be removed?`
const finish = `Congratulation, Which task has been done?`
const unfinished = `Which task still needs more effort?`
const add = function(arr){
    arr.concat(process.argv.slice(2));
    const newTask = [];
    newTask.push(arr);
    newTask.push('uncomplete');
    tasks.push(newTask);
    let currentList = displayToDo(tasks);
    console.log(currentList);
    saveToDo(tasks);
    return tasks;

}
const remove = function(str){
    tasks.splice(Number(str)-1,1);
    let currentList = displayToDo(tasks);
    console.log(currentList);
    saveToDo(tasks);
    return tasks;
}
const complete = function(str){
    let num = Number(str);
    tasks[num-1][1] = 'complete';
    let currentList = displayToDo(tasks);
    console.log(currentList);
    saveToDo(tasks);
    return tasks;
}
const uncomplete = function(str){
    let num = Number(str);
    tasks[num-1][1] = 'uncomplete';
    let currentList = displayToDo(tasks);
    console.log(currentList);
    saveToDo(tasks);
    return tasks;
}
const handleMenu = function(str){
    if(str === '1'){interface.question(newOne,add)}
    else if(str ==='2'){interface.question(original + removeOne,remove)}
    else if(str ==='3'){interface.question(original + finish,complete)}
    else if(str ==='4'){interface.question(original + unfinished,uncomplete)}
    else {console.log('Quitting!');
    interface.close();}
}


interface.question(menu,handleMenu);



