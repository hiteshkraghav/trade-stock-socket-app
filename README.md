Hello Team, Inc
Thanks for sharing the entire project with me.
I have make use for ReactJs library to kick start with the sample problem statement.



### Running the code
Once you have unzipped the folder and are ready to start, you can run  `npm install` in order to get the dependencies.

After you have installed the dependencies you can run:

        $ npm start

This will start the application in dev mode, you can see it running in your browser by going to http://localhost:3000.




## Task Solution
The React Js application starts and connects to the given websocket . 

A input form  is provided to the end user to allow him to search for any ISIN values. Some validations are put to avoid any possible errors.

When a user inputs a valid ISIN and perform search.Given ISIN value is subscribed to socket connection established.

Once the socket connection receives the request it starts sending the values back.

The new subscribed value is saved and refelected to the end user inside the table watchlist component created.

<!-- Already added isin will not reflect in the  -->
A highlighted remove text appears at the end of the table row component.This when clicked send an Unsubscribe request to the web socket and and the socket now stops sending the values back for the given ISIN.

The code is written by following a component approach.Each functionaliy is a part of different readable small component which is extensible and can be re-used.


No externalized ui library is used to render the ISIN details.
To fulfill the purpose of user experience applicable css is applied.


## Questions

1. What happens in case the WebSocket disconnects? How would you go further to keep
   the live data available or inform the user? Please discuss the challenges.

    <!-- Explanation -->
In case the WebSocket disconnect or try to reconnect the status of the app is put offline (from Online).
Inside the watchlist a Column field is inserted which informs user about the last fetch time difference.
In case the connection time out's multiple time user could be asked to refresh and go ahead with entire new connection setup.


2. What happens if a user adds an instrument multiple times to their list? Please discuss possible challenges and mitigations.
     <!-- Explanation -->
A user is as of now prohibted to add an already present ISIN in the watchlist.
Possible ways to handle such situation are below      
    1. Make use of extra space and save the already added ISIN names . Before doing a search check the presence and only go ahead in case not found.
    
    

3. What potential performance issues might you face when this app scales with multiple subscriptions? How would you improve the speed and user experience?

        <!-- Explanation -->

As the web app grows the subscription/un-sub's will also grow. This will create a load both at the front end and backend end service.
In order to achieve better performance a pagination approach should be used where in page size can be fixed at start. Only Isin values that are currently available to the user will be subscribed to the backend.
Also when moving from one page to another all the current ISIN should be unsubscribed to reduce the load.
This will avoid the traffic and can help improving the performance.
The subscription can be stored in ui reference variable to avoid any re-rending of the ui components.
Also to achieve greater performance at the ui end the response fields should be memoized so only new changes can be rendered.


## How to submit your solution

Please zip your project and submit zip archive via the Greenhouse link attached to the email with the code challenge. Your dedicated recruiter will receive the notification about your submission and will send it for the team review.

