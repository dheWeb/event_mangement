import { DataSource } from 'typeorm';
import express from 'express';
import { User } from './model/User';
import { signupRouter } from './controller/signup';
import { loginRouter } from './controller/login';
import { Event } from './model/Event';
import { createEventRouter } from './controller/Event';
import { Booking } from './model/Booking';
import { BookingRouter } from './controller/Booking';



const app = express();

const main = async () => {
	try {
		const AppDataSource =new DataSource({
      type: 'mysql',
      host: '185.199.52.88',
      port: 3306,
      username: 'epsarvatrco_ep',
      password: "Sarvatr@12345",
      database: 'epsarvatrco_tudu',
      // host: 'localhost',
      //  port: 3306,
      //  username: 'root',
      //  password: undefined,
      //  database: 'my_database1', 
      	entities: [
          User,
          Event,
          Booking
        ],
      synchronize: true,
     
    });
    AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
		console.log('Connected to Mysql');

		app.use(express.json());
    app.use(signupRouter);
    app.use(loginRouter);
    app.use(createEventRouter);
    app.use(BookingRouter);
		app.listen(process.env.PORT || 8080, () => {
			console.log('Now running on port 8080');
		});
	} catch (error) {
		console.error(error);
		throw new Error('Unable to connect to db');
	}
  
  
};

main();
