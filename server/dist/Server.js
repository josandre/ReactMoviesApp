"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const apollo_server_express_1 = require("apollo-server-express");
const queries = require("./schemas/UserSchema");
const express_1 = __importDefault(require("express"));
const Server = async () => {
    const server = new apollo_server_express_1.ApolloServer({ schema: queries,
    });
    const port = 5050;
    const connectionString = "mongodb+srv://josandrea:060896@cluster0.dhhkziq.mongodb.net/?retryWrites=true&w=majority";
    const expressServer = (0, express_1.default)();
    const mongoose = await (0, mongoose_1.connect)(connectionString);
    await mongoose.Connection;
    await server.start();
    server.applyMiddleware({ app: expressServer }); //connecting Apollo-server to the HTTP framework Express using ApplyMiddleware
    expressServer.listen({ port }, () => {
        console.log(`server is listening on http://localhost:${port}`);
    });
};
Server().catch((e) => {
    console.log(e, 'error');
});
//# sourceMappingURL=Server.js.map