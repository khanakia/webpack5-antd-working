
## How to Setup

#### DEV ENV
```
git clone https://gitlab.com/solverhood/pest_pricing_member_app.git
yarn install
yarn wpack:dev
yarn start
```
Check the site on http://localhost:7021

#### Deployment
```
yarn build
```
After build Upload **/public/build/** directory to the root of your server.

#### Config Files Path
- **Dev Config:** /src/config/module/dev.js
- **Prod Config:** /src/config/module/prod.js
- **Webpack Config:** /src/config/webpack/dev.config.js