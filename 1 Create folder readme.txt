Setup:
1. Download node.js 
-- Go to: https://nodejs.org/en/download/prebuilt-installer
-- Select your operating system
-- Select the download method: Package Manager, Prebuilt Installer, Prebuilt Binaries, Source Code
-- Click download button and follow instructions

2. Download Visual Studio Code editor
-- https://code.visualstudio.com/download

3. Download Git Bash (Optional: windows, maybe Mac)
-- Git Bash provides unix terminal when using Visual Studio Code
-- https://git-scm.com/downloads

4. Create client Angular application:
-- Create folder hdepotYT
-- Download angular: npm i @angular/cli
-- ng new client

5. Open app in VSC
-- code .
-- run ng serve
-- clean out app.component.html

6. create home component
-- ng g c home --skip-tests 
-- add html for home.component.html
-- copy images to public/assets/img
-- add src/assets to angular.json
-- restart server

7. Install bootstrap, font-awesome and jquery
-- npm i bootstrap, font-awesome
-- add bootstrap, font-awesome to styles section of angular.json
-- add bootstrap, jquery to scripts array

8. Install redux
-- npm i @ngrx/store
-- create home.reducer.ts
-- register HomeReducer in  ngrx/reducers/index.ts
-- register providerStore(reducers) in app.config.ts
-- bring in redux data to HeroCarouselComponent

9. Install Owl Carousel
-- https://www.npmjs.com/package/ngx-owl-carousel-o
-- register owl carousel in angular.json styles array
-- create Owl caraousel customOptions in HeroCarouselComponent
-- create hero carousel in HeroCarouselComponent.html

10. Create top-picks component in home 
-- ng g c home/top-picks --skip-tests --standalone
-- import top-picks component in HomeComponent.ts
-- display top-picks as child in HomeComponent.html
-- put top-picks tab data in HomeReducer initialState;

11. Have TopPicksComponent subscribe to redux

12. Create tabs TopPicksComponent.html
-- create top-pick-data child component

13. Get top pick data from backend
-- create ProductService 
-- config HttpClient
-- build client app
-- call backend for top pick data

14. Create server on backend
-- configure middleware
-- start nodemon
-- server routes

15. Create database connection
    -- get products from database and return to client

16. Dispatch products to product.action
-- store products to productReducer

17. TopPicksData subscribe to ProductReducer
-- display topPickdata owl carousel in html

18. User selects product
-- create routerLink 
-- create app.routes

19. create selectProduct page

20. import toastr
-- https://www.npmjs.com/package/ngx-toastr

21. Create cart
-- create order summary child component

22. Create Checkout Component
-- create Checkout reducer
-- implement ngModel
-- implement error check

24. Save checkout data to local storage

25. Save and restore cart data to and from local storage

26. User sign in/up
-- close modal using ViewChild
-- dispatch user to UserReducer
-- display error message


27, Place Order
-- create request interceptor
