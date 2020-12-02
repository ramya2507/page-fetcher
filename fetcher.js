const request = require('request');
const fs = require('fs');
const args = process.argv;

//function to establish conection and write it in a file
const fetchInformation = function (requestURL,fileToWrite){
  request(requestURL,(error,response,body) => {
    if(error){
      console.log('Error: ',error);
    } else {
      fs.writeFile(fileToWrite,body,'utf-8',(error,bytes) => {
        if(error){
        console.log('Error');
        } else {
        const fileSize = fs.statSync(fileToWrite);
        console.log(`Downloaded and saved ${fileSize.size} bytes to ${fileToWrite}`);
        }
      })
    }
  })
};

fetchInformation(args[2],args[3]);