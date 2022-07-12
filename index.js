const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session")
const redis = require("redis");
const cors = require("cors");
let RedisStore = require('connect-redis')(session);
const {
    MONGO_IP,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PORT,
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET

} = require('./config/config');

let RedisClient  = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
});


const postRouter = require("./routes/posts")
const userRouter = require("./routes/users")

const app = express();
const params = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
connectWithRetry = () => {
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`, params)
    .then(() => console.log('connect to DB ...'))
    .catch((err) => {
        console.log(err);
        setTimeout(() => {
            connectWithRetry()
        }, 5000)
    });
}

connectWithRetry();
app.use(cors({}))
app.use(express.json());
//app.enable("trust proxy") when comment or uncomment it works both cases
app.use(
    session({
        store: new RedisStore({ client: RedisClient }),
        
        secret: SESSION_SECRET,
        
        cookie: {
            secure: false,
            resave: false,
            saveUninitialized: false,
            httpOnly: true,
            maxAge: 60000
        }
    })
)


app.get("/api", (req, res) => {
    res.send("<h2> hi there  !! </h2>");
    console.log('it cool')
})
app.use("/api/posts", postRouter)
app.use("/api/users", userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listen on port ${port}`));
