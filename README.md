

# 108 Dev: SCDF EMERGENCY QR | SCDFXIBM

## a) Project description
![enter image description here](https://user-images.githubusercontent.com/22294841/84587820-0a828300-ae55-11ea-93a6-71b940de088f.png)
</br>
The SCDF Emergency QR Web App aims to save lives through the fastest means. The solution is viable as no app installation is required. Therefore, no concern for app user retention. This app will prepare us to be an emergency ready nation.

We face the issue of responder having difficulties in identifying the location they were at and could delay the efforts from SCDF from reaching out to victims in time. Through the use of technology, we will be able to make effective use of our smartphone to do an incident report at ease. There are millions of application out in the market, and user retention is one of the issues that developers faced. With this web application in place, we do not need to worry about having users have an app installed on their phone. 

On top of that, we do not need responder to register for an account to verify their identity. We make use of a unique identity of a user through phone number, and they can only make a report once they confirm their phone number. To tackle unnecessary abuse of the reporting procedure. The QR code is also placed at a specific residential area where sticker of QR code can be pasted by Grassroot leaders / Social Worker /PA staff / SCDF staff where detailed information of residents is placed in the database of the SCDF. The residents do not need to fear the misuse of their personal data as this information can only be reflected on SCDF side of the portal. We also made a portal to allow SCDF to view the case reported through this web app. 

There are still many potentials that we see in this web app where we can implement more useful services such as reputable providers such as IBM and the services that they can provide.


**Team Members**

 

 - Daniel Kwang [**Team Leader**]
 - Joshua Lim
 - Henry J.
 - Charles Goh
 - Ernest Oh

## b) Pitch video
We have created the pitch video for the SCDF EMERGENCY QR Web App
https://youtu.be/uVDpByaDroU
</br>
You may also refer to our slides for better understanding of the SCDF EMERGENCY QR Web App </br>
https://docs.google.com/presentation/d/1jbMbdSd1Yxq1plnPIA-BjZSrsXm0-pTwoAU3lKTLWTA/edit?usp=sharing

## c) Solution architecture
**Current Architecture**
![enter image description here](https://user-images.githubusercontent.com/22294841/84565683-570a8780-ad9d-11ea-98b2-95ca61f4a880.jpg)

**Projected Future Architecture**
![enter image description here](https://user-images.githubusercontent.com/22294841/84565751-e31caf00-ad9d-11ea-94b4-1bcae9473e8e.jpg)
## d) Project link
SCDF EMERGENCY QR WEB APP

**FOR SCDF STAFF / Grassroot Leaders / Volunteers**
Admin Page For Creation (After Authentication)</br> 
[Due to time constraint, no authentication was added yet]</br>
http://scdf-eqr.web.app/ </br>
![enter image description here](https://user-images.githubusercontent.com/22294841/84585800-f3886480-ae45-11ea-8ae3-30162fa43cf8.png)

Page For Authorised User To Create QR Code For Blocks (Location Based)</br>
[https://scdf-eqr.web.app/createqrforblocks](https://scdf-eqr.web.app/createqrforblocks)</br>
![enter image description here](https://user-images.githubusercontent.com/22294841/84585801-f4b99180-ae45-11ea-9155-e379c32d45c5.png)

Page For Authorised User To Create QR Code For Specific Resident(Unit Based)</br>
[https://scdf-eqr.web.app/createqrforresidents](https://scdf-eqr.web.app/createqrforresidents)</br>
![enter image description here](https://user-images.githubusercontent.com/22294841/84585802-f5522800-ae45-11ea-9fac-30c679e129e3.png)

**Sample QR Code Generated**</br>
This QR Code can be pasted on wall of the blocks or units</br>
![enter image description here](https://user-images.githubusercontent.com/22294841/84586092-d30dd980-ae48-11ea-9521-eda4d3c9d795.png)

**Sample Interface After Reporter Scan The QR Code**</br>
The information is to allow reporter to confirm the location as well as fast verification </br>
of identity of reporter so there will be no fake or prank calls.</br>
![enter image description here](https://user-images.githubusercontent.com/22294841/84586093-d43f0680-ae48-11ea-8f2b-c707d649cd29.png)
</br>
**Admin Portal For SCDF To View On Cases** </br>
[https://scdf-eqr.web.app/admin](https://scdf-eqr.web.app/admin)</br>
![enter image description here](https://user-images.githubusercontent.com/22294841/84585970-ae653200-ae47-11ea-877c-d1a2a012bdef.png)

## e) Project roadmap
This is our current project roadmap and future projection
![enter image description here](https://user-images.githubusercontent.com/22294841/84586274-ab1f7580-ae4a-11ea-9eba-fb6ba8a681bc.jpg)
## f) Project setup
```
npm install
npm run serve
npm run build
```

### g) Using SCDF Emergency QR Web App

(Admins/Community first responders: steps 1-4)

1) At the homepage, click on either "Create EQR for Blocks" 
or "Create EQR for residents".

2) Fill up the form with all the neccessary details. Make sure to upload an img
which describes the location.

3) Click on "Generate Emergency QR"

4) A unique Emergency QR Code will be generate, you can also download and save a PDF version on your pc.

(Everyone: steps 5-6)

5) Scan the QR code using your phone (To be done during an emergency)

6) Enter your phone number and description

7) Click submit and enter a random 6 digit pin for the OTP

8) Request has been sent to SCDF!

(Everyone: steps 5-6)

9) SCDF admin can view all incoming emergency requests from:
http://scdf-eqr.web.app/admin


## h) Live Demo Video
We have an in depth video demonstration for our SCDF EMERGENCY QR 
https://youtu.be/slB5LItcD6c

You may also click on the link below to refer to the guide to using our web app
[link](#project-link)
## i) Solution Used
We used VUE.JS
![enter image description here](https://user-images.githubusercontent.com/22294841/84586899-9a243380-ae4d-11ea-82bb-64bcd42679a9.png)
Firebase
![enter image description here](https://user-images.githubusercontent.com/22294841/84586900-9b556080-ae4d-11ea-8cdc-49d64ea46370.png)
We are also exploring into IBM Cloud Storage solution & Hosting in the future
![enter image description here](https://user-images.githubusercontent.com/22294841/84586931-cd66c280-ae4d-11ea-900b-5fe0afec5397.png)

