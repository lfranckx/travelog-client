NAME OF APP: Travelog

LINK TO LIVE APP: https://toddler-app.now.sh/

CLIENT REPO: https://github.com/lfranckx/ratemybaby-client

API REPO: https://github.com/lfranckx/ratemybaby-api

DEMO USER:
    Username: DemoUser
    Password: Demo1234!

SUMMARY:
This is an App built to hopefully give people an avenue of entertainment and creativity.  The idea behind the app is Tinder, but for babies.  The user can upload a picture of their kid or however many children they have and create profiles for the world to rate. 

TECHNOLOGIES:
This app uses AWS S3 Buckets to upload and store images.  This is all in conjuction with Heroku where the server is deployed. The app is built with React and Node.js.  The API uses JWT authentication with for logging users in and bcrypt to to crypt passwords.  The server also uses multer in order to communicate with the S3 bucket. 