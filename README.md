## JOB ROUTHES
Base url `/api/offers`

| HTTP Mehtod | URL Path      | Description      |
|-------------|---------------|------------------|
| GET         | `/getAllJobs` | Get All Jobs     | 
| POST        | `/createJob`  | Create a new Job | 
| GET         | `/:id`        | Info of the Job  |
| PUT         | `/:id/edit`   | Edit the offer   | 
| DELETE      | `/:id/delete` | Delete The Offer | 

## AUTH ROUTHES
Base url `/api/auth`

| HTTP Mehtod | URL Path           | Description            |
|-------------|--------------------|------------------------|
| POST        | `/singup/companie` | Sing up like a company | 
| POST        | `/singup/employe`  | Sing up like a employe | 
| POST        | `/login`           | login user/companie    | 
| GET         | `/verify`          | Verify auth token      |

