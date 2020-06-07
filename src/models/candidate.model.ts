import {Document, Schema, Model, model} from 'mongoose';

let Config = require('../config');

export interface ICandidate extends Document {
    seq: string,
    firstName: string,
    middleName: string,
    lastName: string,
    birthDate: Schema.Types.Date,
    email: string,
    phoneNumber: string,
    gender: string
}

const CounterSchema = new Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
const counter = model('counter', CounterSchema);

export const CandidateSchema: Schema = new Schema({
    seq: Schema.Types.String,
    firstName: Schema.Types.String,
    middleName: Schema.Types.String,
    lastName: Schema.Types.String,
    birthDate: {
        type: Schema.Types.Date,
        required: true
    },
    email: {
        type: Schema.Types.String,
        unique: true
    },

    phoneNumber: {
        type: Schema.Types.String,
        unique: true
    },
    gender: {
        type: Schema.Types.String,
        required: true,
        enum: ['male', 'female'],
    }
}, {timestamps: true});

CandidateSchema.pre('save',function (next) {
    let doc = <ICandidate>this;
    counter.findOneAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }).then((counter: any)=>{
        doc.seq = counter.seq;
        next();
    }).catch(error=>{
        return next(error);
    })
    
});

//export const Candidate: ICandidateModel = model<ICandidate, ICandidateModel>('Candidate', CandidateSchema);
export const Candidate = model<ICandidate>('Candidate', CandidateSchema);

export default Candidate;
