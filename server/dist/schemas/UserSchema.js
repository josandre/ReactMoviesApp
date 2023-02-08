"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const graphql_1 = require("graphql");
const User_Movies_1 = require("../models/User-Movies");
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
const UserType = new GraphQLObjectType({
    name: "User",
    description: "This is a user",
    fields: () => ({
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        id: { type: GraphQLNonNull(GraphQLString) }
    })
});
const UserMovieType = new GraphQLObjectType({
    name: "UserMovie",
    description: "This is a user has movie object",
    fields: () => ({
        idUser: { type: GraphQLNonNull(GraphQLString) },
        idMovie: { type: GraphQLNonNull(graphql_1.GraphQLInt) },
        id: { type: GraphQLNonNull(GraphQLString) }
    })
});
const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "QueryRoot",
    fields: () => ({
        getUser: {
            type: UserType,
            args: { id: { type: graphql_1.GraphQLID } },
            async resolve(parent, args) {
                console.log("Hola");
                return await User_1.user.findById(args.id);
            }
        },
        getUserByEmail: {
            type: UserType,
            args: { email: { type: GraphQLString } },
            async resolve(parent, args) {
                return await User_1.user.findOne({ email: args.email }).exec();
            }
        },
        getUserMovie: {
            type: new GraphQLList(UserMovieType),
            args: { idUser: { type: GraphQLString } },
            async resolve(parent, args) {
                console.log(args.idUser);
                return await User_Movies_1.userMovies.find({ idUser: args.idUser }).exec();
            }
        }
    })
});
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const userCreated = new User_1.user({
                    name: args.name,
                    email: args.email,
                    password: args.password
                });
                return userCreated.save();
            }
        },
        addUserMovie: {
            type: UserMovieType,
            args: {
                idUser: { type: new GraphQLNonNull(GraphQLString) },
                idMovie: { type: new GraphQLNonNull(graphql_1.GraphQLInt) },
            },
            resolve(parent, args) {
                const userMovieCreated = new User_Movies_1.userMovies({
                    idUser: args.idUser,
                    idMovie: args.idMovie,
                });
                return userMovieCreated.save();
            }
        },
        deleteUserMovie: {
            type: UserMovieType,
            args: {
                idUser: { type: new GraphQLNonNull(GraphQLString) },
                idMovie: { type: new GraphQLNonNull(graphql_1.GraphQLInt) }
            },
            async resolve(parent, args) {
                return await User_Movies_1.userMovies.findOneAndDelete({
                    idUser: args.idUser,
                    idMovie: args.idMovie
                }).exec();
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: Mutation
});
//# sourceMappingURL=UserSchema.js.map