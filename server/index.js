import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from "body-parser";
import colors from "colors";
import morgan from 'morgan';

//routes
import authRoutes from './routes/auth.js';
import podcastsRoutes from './routes/podcasts.js';
import userRoutes from './routes/user.js';
import path from "path";

const app = express();
dotenv.config();

/** Middlewares */
app.use(express.json());
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
// app.use(morgan('tiny'));
// app.disable('x-powered-by');
// app.use(function (request, response, next) {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

const port = process.env.PORT || 8000;

const connect = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('MongoDB connected'.magenta);
    }).catch((err) => {
        console.log(err);
    });
};


app.use(express.json()) 
// app.enable('trust proxy'); // optional, not needed for secure cookies
// app.use(express.session({
//     secret : '123456',
//     key : 'sid',
//     proxy : true, // add this when behind a reverse proxy, if you need secure cookies
//     cookie : {
//         secure : true,
//         maxAge: 5184000000 // 2 months
//     }
// }));



// Express 4.0
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true, parameterLimit:100000, limit: '500mb' }));

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log(`Request body size: ${JSON.stringify(req.body).length} bytes`);
  next();
});


app.use("/api/auth", authRoutes)
app.use("/api/podcasts", podcastsRoutes)
app.use("/api/user", userRoutes)
// app.use("/api/project", projectRoutes)
// app.use("/api/team", teamRoutes)

// ... error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message
  })
})

app.listen(port, () => {
  console.log(`Connected ${port}`.yellow
  .bold)
  connect();
})