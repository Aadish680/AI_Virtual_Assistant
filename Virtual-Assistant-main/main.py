import pyttsx3
import speech_recognition as sr
import datetime
import webbrowser
import wikipedia
import pywhatkit as py
import os
import subprocess
import random
import cv3
import sys
import time
import pyautogui    
import operator
import requests
import tkinter as tk
from tkinter import Entry, Button, Label


engine =pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
engine.setProperty('voice' , voices[0].id)
engine.setProperty('rate', 230)

def speak(audio):
    engine.say(audio)
    engine.runAndWait()
    
def wishMe():
    hour = int(datetime.datetime.now().hour)
    if hour >= 1 and hour <= 12:
        speak("Good Morning Sir!!")
        
    elif hour >=12 and hour<=18:
     speak("Good Afternon Sir!!")
     
    elif hour >=18 and hour <=23:
        speak (" Good Evening Sir !!")
        
    speak("What can i do for you Sir!!")
    
    
    
def takeCommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listeneing")
        r.pause_threshold = 1
        audio = r.listen(source)
        
    try:
        print("Recognizing ......")
        query =r.recognize_google(audio, language='en-in')
        print(f"User saud :{query}\n")
    except Exception as e:
        print("Say that again please ...")
        return "None"
    return query



def run_command():

        query = entry.get().lower()
        if 'alexa' in query:
            print("yes Sir")
            speak("yes Sir")
            
        elif'open google' in query:
            speak("What should i search ")
            qry=takeCommand().lower()
            webbrowser.open(f"{qry}")
            results =webbrowser(qry, sentences=1)
            speak(results)
            
        elif'google' in query:
            webbrowser.open('google.com')
            
        elif'open youtube' in query:
            speak("what do you like to watch")
            qrry = takeCommand().lower()
            py.playonyt(f"{qrry}")
            
        elif'youtube' in query:
            query = query.replace("search on youtube", "")
            webbrowser.open(f"www.youtube.com/results?search_query={query}")
            
        elif'close browser' in query:
          try:
              subprocess.run(["taskkill", "/f", "/im", "opera.exe"], check=True)
              print("browser has been closed successfully.")
          except subprocess.CalledProcessError as e:
              print(f"Failed to close browser: {e}")
              
              
        elif'command prompt' in query:
            os.system("start cmd")
            
        elif'open 12th fail movie' in query:
            os.startfile("C:\\Users\\aadis\\Videos\\12th.Fail.2023.720p.Hindi.WEB-DL.5.1.ESub.x264-HDHub4u.Tv.mkv")
            
        elif'close movie' in query:
          try:
              subprocess.run(["taskkill", "/f", "/im", "vlc.exe"], check=True)
              print("movie  has been closed successfully.")
          except subprocess.CalledProcessError as e:
              print(f"Failed to close movie: {e}")
              
        
        elif'open my video' in query:
            os.startfile("C:\\Users\\aadis\\Videos\\New project.mp4")
            
        
        elif'open sports' in query:
            os.startfile("C:\\Users\\Public\\Desktop\\EA SPORTS FC 24.lnk")
            
        elif'play music' in query:
            music_dir  ='C:\\Users\\aadis\\Music'
            songs = os.listdir(music_dir)
            song_to_play = random.choice(songs)
            os.startfile(os.path.join(music_dir, song_to_play)) 
            
        elif'what is the time' in query:
            strTime = datetime.datetime.now().strftime("%H:%M:%S")
            speak(f"Sir, the time is{strTime}")
            
        elif"shut down the system" in query:
            os.system("shutdown /s /t 5")
            
        elif"restart the system" in query:
            os.system("shutdown /r /t 5")  
            
        elif"open camera" in query:
            cap = cv3.VideoCapture(0)
            while True:
                ret,img=cap.read()
                cv3.imshow('webcam', img)
                k =cv3.waitKey(50)
                if k==27:
                    break;
                cap.release()
                cv3.destroyAllWindows()
                
        elif"go to sleep" in query:
            os.system("rundll32.exe powrprof.dll,SetSuspendState 0,1,0")
            
        elif"take screenshot" in query:
            speak('tell me a name for the file')
            name = takeCommand().lower()
            time.sleep(3)
            img =pyautogui.screenshot()
            img.save(f"{name}.png")
            speak("screenshot saved")
            
        elif"calculate" in query:
            def get_operator_fn(op):
                return{
                    '+' :operator.add,
                    '-' :operator.sub,
                    'x' :operator.mul,
                    'divided' :operator.truediv,
                    'mod' :operator.mod,
                    
                }[op]
                
            def eval_binary_expr(op1, oper,op2):
                op1, op2 = int(op1) , int(op2)
                return get_operator_fn(oper)(op1 ,op2)
            def main():
             r = sr.Recognizer()
             with sr.Microphone() as source:
               speak("Ready to calculate. Please speak your expression.")
               print("Listening ...")
               r.adjust_for_ambient_noise(source)
               audio = r.listen(source)

             try:
                 my_string = r.recognize_google(audio)
                 print("You said: ", my_string)
                 speak("You said: " + my_string)

                 result = eval_binary_expr(*(my_string.split()))
                 speak("Your result is " + str(result))
                 print("Result: ", result)
             except sr.UnknownValueError:
               speak("Sorry, I did not understand that.")
               print("Speech recognition could not understand audio")
             except sr.RequestError as e:
               speak("Sorry, my speech service is down.")
               print(f"Could not request results from Google Speech Recognition service; {e}")
             except Exception as e:
               speak("Sorry, there was an error in calculation.")
               print(f"Error: {e}")
               
            if __name__ == "__main__":
                main()
                
        elif"what is my ip address" in query:
            speak("checking")
            try:
                ipAdd = requests.get('https://api.ipify.org').text
                print(ipAdd)
                speak(ipAdd)
            except Exception as e:
                speak("network is weak , please try again later")
        
        elif"volume up" in query:
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
            pyautogui.press("volumeup")
         
        elif"volume down" in query:
            pyautogui.press("volumedown")   
            pyautogui.press("volumedown")   
            pyautogui.press("volumedown")   
            pyautogui.press("volumedown")   
            pyautogui.press("volumedown")   
            pyautogui.press("volumedown")   
            pyautogui.press("volumedown")   
            pyautogui.press("volumedown")   
            pyautogui.press("volumedown")   
            pyautogui.press("volumedown")   
            pyautogui.press("volumedown")   
            pyautogui.press("volumedown")   
            pyautogui.press("volumedown")   
            pyautogui.press("volumedown")   
            pyautogui.press("volumedown")   
            pyautogui.press("volumedown")   
            pyautogui.press("volumedown") 
            
        elif"mute" in query:
            pyautogui.press("volumemute")  
            
        elif"unmute" in query:
            pyautogui.press("volumeunmute")
        
        elif"get coordinates" in query:
            def get_coordinates():
              print("Move your mouse to the desired location and press 'Ctrl+C'.")
              try:
                 while True:
                    x, y = pyautogui.position()
                    print(f"Current position: ({x}, {y})", end="\r")
              except KeyboardInterrupt:
                  print(f"\nFinal position: ({x}, {y})")
   
            if __name__ == "__main__":
               get_coordinates()
               
               
        elif 'open spotify' in query:
            speak("ok , openeing spotify")
            os.startfile('spotify') 
            
        elif'play' in query:
            os.startfile('spotify')
            speak("ok , playing music")
            pyautogui.press('space')
            
        elif'stop' in query:
            speak("ok, pausing the music")
            pyautogui.press('space')
            
        elif'close spotify' in query:
            speak("ok , closing spotify")
            os.system("taskkill /f /im spotify.exe")
            
            
root = tk.Tk()
root.title("AI Virtual Assistant")
root.geometry("400x300")


label = Label(root, text="Enter Command:")
label.pack(pady=10)

entry = Entry(root, width=50)
entry.pack(pady=15)

button = Button(root, text="Run Command", command=run_command)
button.pack(pady=20)

def voice_command():
    speak("Listening to your voice command...")
    query = takeCommand().lower()
    entry.delete(0, tk.END) 
    entry.insert(0, query)  
    run_command() 

voice_button = Button(root, text="Use Voice Command", command=voice_command)
voice_button.pack(pady=20)
wishMe()

root.mainloop()

            
        
            
             
           
            


            
               
               
               
        
        
           
             
            
    
    
                           
                
            
            
            
            
            
            
    
            
            
            
            

