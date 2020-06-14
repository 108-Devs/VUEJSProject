
# 108 Dev: SCDF EMERGENCY QR | SCDFXIBM

## a) Project description
work on it later

## b) Pitch video
We have created the pitch video for the SCDF EMERGENCY QR Web App
https://youtu.be/uVDpByaDroU

## c) Solution architecture
**Current Architecture**
![enter image description here](https://user-images.githubusercontent.com/22294841/84565683-570a8780-ad9d-11ea-98b2-95ca61f4a880.jpg)

**Projected Future Architecture**
![enter image description here](https://user-images.githubusercontent.com/22294841/84565751-e31caf00-ad9d-11ea-94b4-1bcae9473e8e.jpg)
## d) Project link
SCDF EMERGENCY QR WEB APP

**FOR SCDF STAFF / Grassroot Leaders / Volunteers**
Admin Page For Creation (After Authentication) 
[Due to time constraint, no authentication was added yet]
http://scdf-eqr.web.app/
![enter image description here](https://user-images.githubusercontent.com/22294841/84585800-f3886480-ae45-11ea-8ae3-30162fa43cf8.png)

Page For Authorised User To Create QR Code For Blocks (Location Based)
[https://scdf-eqr.web.app/createqrforblocks](https://scdf-eqr.web.app/createqrforblocks)
![enter image description here](https://user-images.githubusercontent.com/22294841/84585801-f4b99180-ae45-11ea-9155-e379c32d45c5.png)

Page For Authorised User To Create QR Code For Specific Resident(Unit Based)
[https://scdf-eqr.web.app/createqrforresidents](https://scdf-eqr.web.app/createqrforresidents)
![enter image description here](https://user-images.githubusercontent.com/22294841/84585802-f5522800-ae45-11ea-9fac-30c679e129e3.png)

**Sample QR Code Generated**
This QR Code can be pasted on wall of the blocks or units
![enter image description here](https://user-images.githubusercontent.com/22294841/84586092-d30dd980-ae48-11ea-9521-eda4d3c9d795.png)

**Sample Interface After Reporter Scan The QR Code**
The information is to allow reporter to confirm the location as well as fast verification of identity of reporter so there will be no fake or prank calls.
![enter image description here](https://user-images.githubusercontent.com/22294841/84586093-d43f0680-ae48-11ea-8f2b-c707d649cd29.png)
**Admin Portal For SCDF To View On Cases**
[https://scdf-eqr.web.app/admin](https://scdf-eqr.web.app/admin)
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

Vue.js & Firebase (IBM Cloud Storage + Hosting in the future)

