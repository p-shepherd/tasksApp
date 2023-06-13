const fs = require('fs');
const readline = require('readline');

let tasks = [];




function saveTasksToFile()
{const data = tasks.join('\n');

fs.writeFile('tasks.txt', data, (err) => {
    if (err) {
        console.error('Błąd zapisu!', err);
    }
    else {
        console.log(
            
        );
        }});
}

function readTasksToProgram() {
    fs.readFile('tasks.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Błąd odczytu!', err);
      } else {
        
        tasks = data.split('\n');
        console.log('Twoje zadania:');
        tasks.forEach((tasks, index) => {
          console.log(`${index + 1} - ${tasks}`);
        });
        displayMenu();
        getUserChoice();
      }
    });
  }
  



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


console.log('Witaj! Co dzisiaj robimy?');

//funkcja wyswietlajaca menu
function displayMenu(){
    console.log('\Wyberz jedną z opcji:');
    console.log('0. Podgląd zadań');
    console.log('1. Dodaj zadanie');
    console.log('2. Ukończ zadanie');
    console.log('3. Zakończ');
}

//funkcja wyswietlajaca zadania
function viewTasks(){
    console.log('Twoje zadania:');
    tasks.forEach((task, index) => {
        console.log(`${index} - ${task}`);
    });
}

//funkcja umozliwiajaca dodanie nowego zadania 1
function addTask() {
    rl.question('Wypisz nowe zadanie: ', (answer) => {
        
        tasks.push(answer);
        console.log(`Dodano zadanie: ${answer}`);
        console.log('zadania zostały zapisane w pliku tasks.txt');
        saveTasksToFile();
        displayMenu();
        getUserChoice();
    });
}

//funkcja umozliwiajaca oznaczenie zadania jako ukonczone 2
function completeTask() {
    viewTasks();
    rl.question('Wpisz numer zadania, które chcesz oznaczyć jako ukończone: ', (answer) => {
      const taskIndex = parseInt(answer);
      if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks.splice(taskIndex, 1);
        saveTasksToFile();
        console.log('Zadanie oznaczone jako ukończone!');
      } else {
        console.log('Nieprawidłowy numer zadania.');
      }
      displayMenu();
      getUserChoice();
    });
  }

  // główna funkcja programu pozwalajaca wybrac opcje z wyswietlonego menu i odwolujaca sie do pozostalych funkcji
  function getUserChoice() {
    rl.question('Wybierz opcję (0-2): ', (answer) => {
      switch (answer) {
        case '0':
        readTasksToProgram();
          break;
        case '1':
          addTask();
          saveTasksToFile();
          break;
        case '2':
          completeTask();
          break;
        case '3':
        saveTasksToFile();
          rl.close();
          console.log('Do widzenia!');
          return;
        default:
          console.log('Nieprawidłowa opcja.');
      }
      displayMenu();
      getUserChoice();
    });
  }

displayMenu();
getUserChoice();