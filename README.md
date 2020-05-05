=> The inversifyPOC folder contains about   Inversify js dependency injection 
where u can run that by using the below command

ts-node inversifyPOC/index 




Node JS  Web Application 

=> the src folder contains the web api development using inversify-express-utils

it runs on localhost 4000

  ts-node src/index

in src folder , containd internal folder controller, entities, interfaces, middleware

controllers
 
 1. Auth Controller  => it is implemented using baseHttpController to use HttpContext , AuthPRovider and Principal to check user validation. please check middleware folder.
 2.Home Controller => home page
 3. Plan Controller => its a custom controller . CRUD operations on mongoDB. mongoDB implementation in mongoDB folder.
 4. user Controller => uses TYPEORM. u can see TYPEORM implementation in entities foilder.


=>  Added Swagger UI 

http://localhost:3000/swagger/