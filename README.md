# Automated Dialer App (Android App + Web Service) 

Live Beta: https://codastickfantastic.github.io/ultimate-dialer-web-service/

## Technologies
- React
- React Native
- Google Firebase
- SCSS

## How to use the application 
1. Sign un to the Web Service and download Android app for your phone (Beta)
2. Upload contact databse according to provided instruction 
3. Sign in to Android app and pick a list to start automated calls

## About Application 
Automated Dialer App is a tool for telemarketers that helps manage calls in order to save time. 
Main function is autoamted dialing. 
In order to use it a user need to upload contacts database via Web Service. 
After that he will be allowed to download Android application that core concept is que thta uploaded list and call it withouth number dialing.
After each call user can add feedback that will be saved in Firebase. 

## Developing Process
In order to make this application there was need to create custom native module for React Native. 
As default Android block direct calls, and React Native API provide only interface for make call with user acceptance action. 
In this case default React Native module do not meet assumed expectation. 
To deal with this problem there was need to create custom native module. 
Module was written in Java and attached to React Native API.
Right now user is allowed to make direct call from application withouth anny other interrupt interface. 

## Utility
 - Automated qued calls
 - Collect feedback after each call
 - Manage uploaded databes via Web Service
 - Feedback provider via Web Service
 
## Web Service Screenshots
### Dashboard
![Automated Dialer Dashboard](https://user-images.githubusercontent.com/118989184/222166074-89c2040f-939f-4a70-afbe-b1bee6894693.png)

### Add Contact List
![Automated Dialer Add Contact](https://user-images.githubusercontent.com/118989184/222166205-ff5ac488-7411-41a2-935b-5fe97ae85576.png)

### Feedbacks 
![Automated Dialer Contact List](https://user-images.githubusercontent.com/118989184/222166283-2e94f5ca-0ea7-4fd6-8046-b0b08f56669f.png)

## Android App Screenshots
### Sign In


### Dashboard


### Call List
![Screenshot_1677680454](https://user-images.githubusercontent.com/118989184/222167210-cf632974-1de2-4f7e-9c92-9393b867caf1.png)

<table>
  <tbody>
    <tr>![Screenshot_1677680359](https://user-images.githubusercontent.com/118989184/222166900-b1e424ab-f649-4dc7-a792-326aba18c741.png)</tr>
    <tr>![Screenshot_1677680422](https://user-images.githubusercontent.com/118989184/222167077-4d01d271-c22f-426a-8712-2c7a3959090d.png)</tr>
  </tbody>
</table>

### To Do: 
- Increase security checking of uploaded file 
- Added bulk SMS campaing section in near future
