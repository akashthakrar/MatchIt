import {Document, Schema, Model, model} from 'mongoose';

let Config = require('../config');

export interface ICandidate extends Document {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
}

export const CandidateSchema: Schema = new Schema({
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

//export const Candidate: ICandidateModel = model<ICandidate, ICandidateModel>('Candidate', CandidateSchema);
export const Candidate = model<ICandidate>('Candidate', CandidateSchema);

export default Candidate;
