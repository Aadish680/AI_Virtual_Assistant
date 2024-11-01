const btn = document.querySelector("#btn");
const content = document.querySelector("#content");
const voice =document.querySelector("#voice");

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB"
    window.speechSynthesis.speak(text_speak)

}

function wishMe(){
    let day = new Date()
    let hours = day.getHours()
    
    if(hours >= 0 && hours < 12){
        speak("Good Morning Sir")
    }
    else if(hours >= 12 && hours < 16){
        speak("Good afternoon sir");
    }else{
        speak("Good Evening sir");
    }
}
btn.addEventListener("click",()=>{
   wishMe()
})



function calculateSum(num1, num2) {
    return num1 + num2;
}
function calculateSubtraction(num1, num2) {
    return num1 - num2;
}
function calculateMultiplication(num1, num2) {
    return num1 * num2;
}
function calculateDivision(num1, num2) {
    if (num2 === 0) {
        alert("Cannot divide by zero");
        speak("cannot a divide a number")
        return null;
    }
    return num1 / num2;
}
function generateImage(prompt) {
  speak(`Generating an image of ${prompt}. Please wait...`);

  // You would replace the following code with actual API integration
  // Sample API call to image generation service
  fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY' // Use your API key
      },
      body: JSON.stringify({
          prompt: prompt,
          n: 1, // number of images
          size: "1024x1024" // image size
      })
  })
  .then(response => response.json())
  .then(data => {
      let imageUrl = data.images[0].url; // Assuming response contains a URL to the generated image
      displayImage(imageUrl, prompt);
  })
  .catch(error => {
      console.error('Error generating image:', error);
      speak("Sorry, there was an error generating the image.");
  });
}

// Function to display the image
function displayImage(url, altText) {
  const img = document.createElement("img");
  img.src = url;
  img.alt = altText;
  img.style.width = "400px"; // Customize as needed
  img.style.height = "auto";

  // Add the image to the page
  const contentDiv = document.querySelector("#content");
  contentDiv.innerHTML = ""; // Clear any previous content
  contentDiv.appendChild(img);
}


// Start Recognization here.

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognization = new speechRecognition()
recognization.onresult = (event)=>{
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognization.start();
    btn.style.display ="none"
    voice.style.display ="block"

})


function takeCommand(message){
    btn.style.display="flex";
    voice.style.display ="none"
    
    if(message.includes("hello") || message.includes("hey")){
        speak("Hello sir, what can i do for you Sir? ");
    }
    else if(message.includes("who are you")){
        speak(" i am virtual assistant ,created by mas group sir.");
    }
    else if(message.includes("open youtube")){
        speak("opening youtube");
        window.open("https://www.youtube.com")
    }
     else if (message.includes("search in youtube for")) 
        {
        let playStr = message.split("");
        playStr.splice(0, 5);
        let videoName = playStr.join("");
        playStr = playStr.join("").split(" ").join("+");
        speak(`searching youtube for ${videoName}`);
        window.open(`https://www.youtube.com/search?q=${playStr}`);
        
      }
   else if(message.includes("open instagram")){
        speak("opening instagram");
        window.open("https://www.instagram.com");
      }
      if (message.includes("open google")) {
        speak("opening google");
         window.open("https://www.google.com"); 
    } 
    else if (message.includes("close google")) {
        if (googleWindow) { 
            speak("closing google");
            googleWindow.close(); 
        } else {
            speak("Google window is not open");
        }
    }
   
   else if(message.includes("open calculator")){
        speak("opening calculator");
        window.open("calculator://");
      }
   else if(message.includes("time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"});
        speak(time)
      }
   else if(message.includes("date")){
        let date= new Date().toLocaleString(undefined,{day:"numeric",month:"short"});
        speak(date)
      }
      else if (message.includes("google about")) 
        {
        let playStr = message.split("");
        playStr.splice(0, 5);
        let videoName = playStr.join("");
        playStr = playStr.join("").split(" ").join("+");
        speak(`this what i got in the google about ${videoName}`);
        window.open(`https://www.google.com/search?q=${playStr}`);
        
      }
   else if(message.includes("open cmd")){
    speak("opening cmd");
    window.open("C:\Users\aadis\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\System Tools");
  }
   else if (message.includes("open calendar")) 
   {
    speak("opening calendar");
    window.open("https://calendar.google.com/");
  }
   else if (message.includes("close all tabs")) {
    speak("closing all tabs sir")
    window.forEach((e) => {
      e.close()
    })
  }
  else if (message.includes("open github")) {
    speak("opening github");
    window.open("https://github.com/");
   
  }
  else if (message.includes("open instagram")) {
    speak("opening instagram sir");
    window.open("https://www.instagram.com");
    
  }
  if (message.includes("open my instagram profile")) {
    speak("opening your instagram profile");
    window.open("https://www.instagram.com/aadish_2004/")
  }
  else if(message.includes("open my github account")){
    speak("opening your github account");
    window.open("https://github.com/Master4583")
  }
   else if (message.includes("open canva")) {
    speak ("opening canva designs");
    window.open("https://www.canva.com/en_in/");
  }
  else if (message.includes("open spotify")) {
    speak("opening spotify");
    window.open("https://open.spotify.com/");
  }
  if (message.includes("open whatsapp")) {
    speak("opening whatsapp");
    window.open("https://web.whatsapp.com/");
    
  }
  if (message.includes("full weather report")) {
    speak("opening the weather report sir");
    window.open(`https://www.google.com/search?q=weather+in+`);
  }
   else if (message.includes("shut down")) {
    speak("Ok sir i will take a nap");
    stopingR = true;
    recognition.stop();
  }
   else if (message.includes("are you there")) {
    speak("yes sir");
  }
  else if(message.includes("what is my ip address")){
    speak("Fetching your IP address, please wait.");
    
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        let ipAddress = data.ip;
        console.log("Your IP address is: " + ipAddress);
        speak("Your IP address is " + ipAddress);
    })
    .catch(error => {
        console.error('Error fetching IP address:', error);
        speak("Sorry, I couldn't fetch the IP address at the moment.");
    });
}
else if (message.includes("open 12 fail movie")){
    speak("opening 12th fail movie");
    window.open("C:\\Users\\aadis\\Videos\\12th.Fail.2023.720p.Hindi.WEB-DL.5.1.ESub.x264-HDHub4u.Tv.mkv");

  
}else if (message.includes("calculate for")|| message.includes("what is the sum of")) {
    let numbers = message.match(/\d+/g); // Extract all numbers from the message
    if (numbers.length >= 2) {
        let num1 = parseFloat(numbers[0]);
        let num2 = parseFloat(numbers[1]);
        let sum = calculateSum(num1, num2);
        speak(`The sum of ${num1} and ${num2} is ${sum}`);
    } 
}else if(message.includes("calculate subtraction")|| message.includes("what is the subtraction of")){
    let numbers = message.match(/\d+/g); // Extract all numbers from the message
    if (numbers.length >= 2) {
        let num1 = parseFloat(numbers[0]);
        let num2 = parseFloat(numbers[1]);
        let sub= calculateSubtraction(num1, num2);
        speak(`The subtraction of ${num1} and ${num2} is ${sub}`);
    } 

}
else if(message.includes("calculate multiplication")||message.includes("what is the multiplication of of")){

    let numbers = message.match(/\d+/g); // Extract all numbers from the message
    if (numbers.length >= 2) {
        let num1 = parseFloat(numbers[0]);
        let num2 = parseFloat(numbers[1]);
        let mul= calculateMultiplication(num1, num2);
        speak(`The multiplication of ${num1} and ${num2} is ${mul}`);
    } 


}
else if( message.includes("calculate division")||message.includes("what is the division of")){
    let numbers = message.match(/\d+/g); // Extract all numbers from the message
    if (numbers.length >= 2) {
        let num1 = parseFloat(numbers[0]);
        let num2 = parseFloat(numbers[1]);
        let div= calculateDivision(num1, num2);
        speak(`The division of ${num1} and ${num2} is ${div}`);
    } 

}else  if (message.includes("generate image of")) {
  let query = message.replace("generate image of", "").trim();
  generateImage(query);
} 
else if(message.includes("open my gmail account")){
  speak("opening your gmail account");
  window.open("https://mail.google.com/mail/u/0/#inbox");
}
else if(message.includes("open my linkedin profile")){
  speak("opening your linkedin profile");
  window.open("https://www.linkedin.com/in/aadish-shibu-a214b025b/");
}



  

  
   

   
}