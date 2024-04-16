import { config } from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai"

import readline from 'readline'
config();


// ACTIVITY 1 
// Use readline to read data from a Readable stream
// Create a userinterface and specify the inputs and outputs
const userInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout});

userInterface.setPrompt('OHAI> ');
console.log(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// rl.prompt();

// rl.on('line', function(line) {
//     switch(line.trim()){
//         case 'hello':
//             console.log('world');
//             break;
//         default:
//             console.log('Say what? I might have heard `' + line.trim() + '` ');
//             break;
//     }
//     rl.prompt();
// }).on('close', function() {
//     console.log('Have a great day!');
//     process.exit(0);
// });


async function handleInput(input) {
    try {
      
      // ACTIVITY 2 
      // initialize the gemini model as "model" and use the model to generate Content 
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Generate content based on the user's input
      // save the model's response in the variable "response"
      // print the model's reponse
      const result = await model.generateContent(input);
      const res = await result.response;

      // Activity 1 
      // re prompt the interface to get the next input from the user 
      // hint: you might want to use .prompt()
      // hint 2: you will also have to prompt outside of this function to initialize chat

        console.log(res.text());
        userInterface.prompt();
    } catch (error) {
      console.error('Error processing your input:', error);
    }
}
  
    userInterface.prompt();
  
  // ACTIVITY 1
  userInterface.on("line", (input) => {
     // use the handle input function you wrote here
     handleInput(input);
  });