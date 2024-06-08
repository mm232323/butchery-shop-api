import bodyParser from 'body-parser';

import express from 'express';

import mainRoutes from './routes/main'

import barbecueRoutes from './routes/barbecue'

import locationsRoutes from './routes/locations'

import shopRoutes from './routes/shop'

const app = express();

app.use(bodyParser.json());

app.use(mainRoutes)

app.use(barbecueRoutes)

app.use(locationsRoutes)

app.use(shopRoutes)

app.listen(3000)