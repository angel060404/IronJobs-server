## JOB ROUTHES
Base url `/api/offers`

| HTTP Mehtod | URL Path                         | Description             |
|-------------|----------------------------------|-------------------------|
| GET         | `/getAllOffers`                  | Get All offers          | 
| POST        | `/saveOffer`                     | Create a new Job        | 
| GET         | `/getOneOffer/:offer_id`         | Info of the offer       |
| PUT         | `/updateOffer/:offer_id`         | Edit the offer          | 
| DELETE      | `/deleteOffer/:offer_id`         | Delete The Offer        | 
| PUT         | `/subscribeUser/:offer_id`       | Subscribe to offer      |
| PUT         | `/subscribeUser/:offer_id`       | Unsubscribe of the offer|

## AUTH ROUTHES
Base url `/api/auth`

| HTTP Mehtod | URL Path           | Description            |
|-------------|--------------------|------------------------|
| POST        | `/singup/`         | Sing up like a company | 
| POST        | `/login`           | login user/companie    | 
| GET         | `/verify`          | Verify auth token      |
| GET         |`/:user_id`         | Get the User           |  

## COMPANIES ROUTES
Base url `/api/companies`

| HTTP Mehtod | URL Path                     | Description            |
|-------------|------------------------------|------------------------|
| GET         | `/getAllCompanies`           | Get all Companies      |
| GET         |`/getOneCompany/:company_id`  | Get One Company        |  
| POST        | `/createCompany`             | Create Company         | 
| POST        | `/deleteCompany/:company_id` | Delete a company       | 
| PUT         |`/updateCompany/:company_id`  | Edit Company           |


