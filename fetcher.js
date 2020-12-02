const request = require('request');
const fs = require('fs');
const readline = require('readline');
const { stdin } = require('process');

// function to get the arguments 
const getArguments = () =>{
  const args = process.argv.slice(2);
  if(args.length === 0) {
    console.log('Please provide a valid URL and filename');
    process.exit(1);
  } else if(!args[1]){
    console.log('Invalid pathname!');
    process.exit();
  } else {
    return args;  
  }
};

const [URL, destination] = getArguments();

//Readline to create stdin and stdout
const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
})

//function to ask if the file has to be Overwritten
const askToOverwrite = function(file,data){
    rl.question('Do you want to overwrite? (y or n)',(answer) => {
      if(answer.toLowerCase() === 'y'){
        storeInformation(file,data);
      }else if(answer.toLowerCase() === 'n'){
        process.exit();
      } else {
        storeInformation(file, data);
      }
    })
}
//establishes connections and passes the data 
request(URL,(error,response,body) => {
    if(error){
      console.log('Error: ',error);
    } else if(fs.existsSync(destination)) {
      askToOverwrite(destination,body);      
    } else {
      storeInformation(destination,body);      
    }
  })

const storeInformation = function(fileToWrite,body){
  fs.writeFile(fileToWrite,body,'utf-8',error => {
    if(error){
    console.log('Error');
    } else {
    const fileSize = fs.statSync(fileToWrite);
    console.log(`Downloaded and saved ${fileSize.size} bytes to ${fileToWrite}`);
    rl.close();
    }
  })
}
