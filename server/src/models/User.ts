import {Schema, model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export class User{
    name: string;
    email: string;
    password: string;
    

    constructor(partial? : Partial<User>) {
       if(partial){
           Object.assign(partial);
       }
    }

}

const Userschema = new Schema<User>({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }

})

Userschema.plugin(uniqueValidator);
export const user = model<User>("User", Userschema); //tipando el objeto que se inserta en mongo