import {Schema, model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


export class UserMovies{
    idUser: Schema.Types.ObjectId;
    idMovie: Number;


    constructor(partial? : Partial<UserMovies>) {
        if(partial){
            Object.assign(partial);
        }
    }

}

const UserMovieSchema = new Schema<UserMovies>({
    idUser:{
        type: Schema.Types.ObjectId,
        required:true
    },
    idMovie:{
        type: Number,
        required: true
    }
})

UserMovieSchema.plugin(uniqueValidator);
export const userMovies = model<UserMovies>("UserMovies", UserMovieSchema); //tipando el objeto que se inserta en mongo



