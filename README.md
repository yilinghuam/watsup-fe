# Watsup
## Link to app:
* frontend:[Link here](https://watsup-fe.herokuapp.com/)
* backend :
[Link here](https://watsup-be.herokuapp.com/)
* backend github:[Link here](https://github.com/yilinghuam/watsup-be)


## User story
A groupbuy platform to facilitate the easy buying of goods and services from neighbours

## Initial planning
* Figma wireframe: [Link here](https://www.figma.com/file/b1KhU6VkX2zcDxnissFzHb/Watsup-design-file?node-id=24%3A8652)

## Tech stack
* Frontend: React + Typescript
   * Google api - login and registration
   * Full calendar - calendar
   * Axios - Promise-based HTTP Client for browser and NodeJS
   * React-cookies - for storing cookies
* Backend: golang **New thing self-learned for this project
   * Google api - for verification of access token
   * JWT token
   * echo framework
   * mysql driver - sql handling
* Database: Mysql
---------
## Restful routes
|No.|Route      | URL                   | HTTP Verb |Description
|--|------------|-----------------------|-----------|------------ 
|1.|Index      | /login                   | GET |login and get JWT
### Groupbuy page
|No.|Route      | URL                   | HTTP Verb |Description
|--|------------|-----------------------|-----------|------------ 
|1.|Index      | /groupbuy                   | GET |Retrieve all groupbuys that are open
|3.|Create      | auth/groupbuy/orders                | POST |Add orders
|4.|Show      | groupbuy/:idgroupbuy                   | GET |Show individual groupbuy according to groupbuy_id
| |      | auth/groupbuy/:id/view                 | GET |Show order list according to groupbuy_id
| |     | auth/groupbuy/:id/orderstatus                 | GET |Show order status according to groupbuy_id
|6.|Update      | auth/groupbuy/:id/editstatus                   | PATCH |Update groupbuy status according to groupbuy_ids
| |      | auth/groupbuy/:id/editorderStatus                  | PATCH |Update order status according order_Id
|7|Delete      | auth/groupbuy/:id/delete                   | DELETE |Delete groupbuy info
| |      | auth/groupbuy/:id/deleteorder                   | DELETE |Delete order


### Dashboard page
|No.|Route      | URL                   | HTTP Verb |Description
|--|------------|-----------------------|-----------|------------ 
|3.|Create      | auth/dashboard-add              | POST |Create hosting groupbuy as well as groupbuy items
|4.|Show      | auth/dashboard-view                  | GET |Show hosted groupbuys and ordered groupbuys

----------
## Technical challenges
* formatting data to the way that I would like my front end to receive from sql
* error handling in golang

## Improvements to make
* integrate payment method for groupbuy
* improve on error handling in golang
* adding toasts etc to display error messages and success messages
* improving typing in typescript (remove all any used and improve on interfaces typing)
* show delivery addresses for orders that allows delivery
* add excel export from the orders made
* shift all data handling to golang (especially for those in view orders)

## Notes:
* time spent actually coding: 10days
