# Travelog

## Link:
https://travelog-client.now.sh/

## API REPO
https://github.com/lfranckx/travelog-api

## SUMMARY:
This app serves as a platform for people to find articles on anything related to travel. Users who are registered can share posts with an image and comment on other articles including their own. Users can also create their own profile containing their about me and a profile image. From their profile page they have access to articles they've written which they can edit and delete. 

## TECHNOLOGIES:
This app uses AWS S3 Buckets to upload and store images.  This is all in conjuction with Heroku where the server is deployed. The app is built with React and Node.js.  The API uses JWT authentication with for logging users in and bcrypt to to crypt passwords.  The server also uses multer in order to communicate with the S3 bucket. 

## In Action:
### Main Page
<img width="800" 
    alt="Screen Shot 2020-05-18 at 4 42 04 PM" src="https://user-images.githubusercontent.com/52330544/82269669-34fd2100-9927-11ea-9b26-0186a8d2a138.png">

### Article Page
<img width="800"  
    alt="Screen Shot 2020-05-18 at 4 42 56 PM" src="https://user-images.githubusercontent.com/52330544/82269677-39293e80-9927-11ea-9e40-670307302b17.png">

### User Profile Page
<img width="800"  
    alt="Screen Shot 2020-05-18 at 4 43 25 PM" src="https://user-images.githubusercontent.com/52330544/82269679-3c242f00-9927-11ea-99f2-9d1e59f86325.png">

### Post Article Page
<img width="800" 
    alt="Screen Shot 2020-05-18 at 4 45 29 PM" src="https://user-images.githubusercontent.com/52330544/82269681-3d555c00-9927-11ea-8a93-41f8df6be839.png">

### Comment Section
<img width="800" alt="Screen Shot 2020-05-24 at 10 42 13 PM" src="https://user-images.githubusercontent.com/52330544/82781993-1cea3d80-9e10-11ea-8092-b9248342ec1d.png">
