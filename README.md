# Welcome to List Of Posts 👋

This project displays a list of patient posts that share their assessment for a health concern they had. The posts can be filtered by gender and age group, and expanded to read the full post and comments.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```
   For iOS, navigate to the ios directory and install pods

   ```bash
   cd ios && pod install
   ```

2. Start the JSON server

   ```bash
   npm run json-server
   ```

   This starts a server on http://0.0.0.0:3000. post_url is used as the id field.

3. Start the expo development server

   ```bash
    npm run start
   ```

4. Now you can run on your desired platform by following the keyboard rules that are shown in the terminal
   ```bash
   a # for Android
   w # for web
   i # for iOS
   ```

#### Extra Steps for Android

Port forwarding must be enabled on Android in order to successfully make calls to the API.

1. Open chrome://inspect/#devices on Google Chrome

2. Click `Port Forwarding`

3. Add the android IP address and port which is most likely:
   `localhost:8081` or `localhost:8080`

4. Make sure `Enable port forwarding` is checked.

5. Click `Done`

6. You must also open up Google Chrome on your Android device and go to http://localhost:8081


### Notes:

- Main screen is located in /app/index.tsx
- Components for the Patient Experience stack is located in /components/patient-experiences