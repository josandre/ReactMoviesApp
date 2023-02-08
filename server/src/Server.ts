
import {connect} from 'mongoose';
import {ApolloServer} from "apollo-server-express";
const queries = require("./schemas/UserSchema")

import Express from "express";


const Server = async () => {

    const server = new ApolloServer({schema: queries,
    });

    const port = 5050;
    const connectionString = "mongodb+srv://josandrea:060896@cluster0.dhhkziq.mongodb.net/?retryWrites=true&w=majority";

    const expressServer: Express.Application = Express();
    const mongoose =  await connect(connectionString);

    await mongoose.Connection;

    await server.start();
    server.applyMiddleware({app:expressServer});//connecting Apollo-server to the HTTP framework Express using ApplyMiddleware

    expressServer.listen({port}, ()=>{
        console.log(`server is listening on http://localhost:${port}`)
    })


}

Server().catch((e) => {
    console.log(e, 'error');
})








