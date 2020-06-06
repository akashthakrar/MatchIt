import {Document, Schema, Model, model} from 'mongoose';

let Config = require('../config');

export interface ICandidate extends Document {
    seq: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
}

const CounterSchema = new Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
const counter = model('counter', CounterSchema);

export const CandidateSchema: Schema = new Schema({
    seq: Schema.Types.String,
    firstName: Schema.Types.String,
    lastName: Schema.Types.String,
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },

    phoneNumber: {
        type: Schema.Types.String,
        unique: true
    }
}, {timestamps: true});

CandidateSchema.pre('save',function (next) {
    let doc = <ICandidate>this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }).then((counter: any)=>{
        doc.seq = counter.seq;
        console.log(doc);
        next();
    }).catch(error=>{
        return next(error);
    })
    
});

//export const Candidate: ICandidateModel = model<ICandidate, ICandidateModel>('Candidate', CandidateSchema);
export const Candidate = model<ICandidate>('Candidate', CandidateSchema);

export default Candidate;
