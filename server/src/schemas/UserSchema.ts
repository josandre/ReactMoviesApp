import {user} from "../models/User";
import {GraphQLID, GraphQLInt} from "graphql";
import {userMovies} from "../models/User-Movies";


const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull

} = require('graphql');

const UserType = new GraphQLObjectType({
    name: "User",
    description: "This is a user",

    fields: () => ({
        name: {type:GraphQLNonNull(GraphQLString)},
        email: {type:GraphQLNonNull(GraphQLString)},
        password: {type:GraphQLNonNull(GraphQLString)},
        id:{type:GraphQLNonNull(GraphQLString)}
    })
})

const UserMovieType = new GraphQLObjectType({
    name: "UserMovie",
    description: "This is a user has movie object",

    fields: () => ({
        idUser: {type:GraphQLNonNull(GraphQLString)},
        idMovie: {type:GraphQLNonNull(GraphQLInt)},
        id: {type: GraphQLNonNull(GraphQLString)}
    })
})

const RootQueryType = new GraphQLObjectType({// represents all the entry points the graphql API
    name: "Query",
    description: "QueryRoot",
    fields : () => ({
        getUser: {
            type: UserType,
            args:  {id:{type: GraphQLID}},
            async resolve(parent, args) {//is the access to the database and constructs the return found object
                console.log("Hola");
                return await user.findById(args.id);
            }
        },
        getUserByEmail:{
            type: UserType,
            args:  {email:{type: GraphQLString}},
            async resolve(parent, args) {//is the access to the database and constructs the return found object
                return await user.findOne({email: args.email}).exec();
            }
        },
        getUserMovie: {
            type: new GraphQLList(UserMovieType),
            args:  {idUser:{type: GraphQLString}},

            async resolve(parent, args) {//is the access to the database and constructs the return found object
                console.log(args.idUser)
                return await userMovies.find({idUser: args.idUser}).exec();
            }
        }
    })
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name:{type: new GraphQLNonNull(GraphQLString)},
                email:{type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },

            resolve(parent, args){
                const userCreated = new user({
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
                idUser:{type:  new GraphQLNonNull(GraphQLString)},
                idMovie:{type: new GraphQLNonNull(GraphQLInt)},
            },

            resolve(parent, args){
                const userMovieCreated = new userMovies({
                    idUser: args.idUser,
                    idMovie: args.idMovie,
                });

                return userMovieCreated.save();
            }
        },
        deleteUserMovie: {
            type: UserMovieType,
            args:{
                idUser: {type: new GraphQLNonNull(GraphQLString)},
                idMovie: {type: new GraphQLNonNull(GraphQLInt)}
            },
             async resolve(parent, args){

                return  await userMovies.findOneAndDelete({
                    idUser: args.idUser,
                    idMovie : args.idMovie
                }).exec();
            }
        }

    }
})


module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: Mutation
})
