/*import {userMovies} from "../models/User-Movies";
import {GraphQLID} from "graphql";


const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt

} = require('graphql');

const UserMovieType = new GraphQLObjectType({
    name: "UserMovie",
    description: "This is a user has movie object",

    fields: () => ({
        idUser: {type:GraphQLNonNull(GraphQLString)},
        idMovie: {type:GraphQLNonNull(GraphQLInt)},

    })
})

const RootQueryType = new GraphQLObjectType({// represents all the entry points the graphql API
    name: "Query",
    description: "QueryRoot",
    fields : () => ({
        getUserMovie: {
            type: UserMovieType,
            args:  {idUser:{type: GraphQLID}},
            async resolve(parent, args) {//is the access to the database and constructs the return found object
                return await userMovies.findById(args.idUser);
            }
        }
    })
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUserMovie: {
            type: UserMovieType,
            args: {
                idUser:{type: new GraphQLNonNull(GraphQLString)},
                idMovie:{type: new GraphQLNonNull(GraphQLInt)},
            },

            resolve(parent, args){
                const userMovieCreated = new userMovies({
                    idUser: args.idUser,
                    idMovie: args.idMovie,
                });

                return userMovieCreated.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: Mutation
})

REVISAR Y BUSCAR UNA MANERA DE QUE APOLLO SERVER ME PERMITA EL INGRESO DE MAS QUERIES DE TIPO GRAPHQLSCHEMA

 */ 
//# sourceMappingURL=UserMovieSchema.js.map