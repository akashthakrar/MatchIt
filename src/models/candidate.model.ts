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



/*
import {Document, Schema, Model, model} from 'mongoose';
import {ObjectID} from "bson";

let Config = require('../config');

export interface ICandidateDocument extends Document {
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    tokens: Array<{ access: string, token: string }>
    forgetToken: string,
    role: string,
    createdBy: ObjectID,
    isArchived: boolean
}

export interface ICandidate extends ICandidateDocument {
    removeToken(token: string): Promise<ICandidate>;

    getAuthToken(): Promise<ICandidate>;

    getForgetToken(): Promise<ICandidate>;
}

export interface ICandidateModel extends Model<ICandidate> {



    findByEmail(email: string): Promise<void | ICandidate>;
}

export const CandidateSchema: Schema = new Schema({
    name: Schema.Types.String,
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password: Schema.Types.String,
    phoneNumber: {
        type: Schema.Types.String,
        unique: true
    },
    role: {
        type: Schema.Types.String,
        enum: ['SA', 'BD']
    },
    tokens: [{
        access: {
            type: Schema.Types.String
        },
        token: {
            type: Schema.Types.String
        }
    }],
    forgetToken: Schema.Types.String,
    isArchived: {type: Schema.Types.Boolean, default: false},
    createdBy: {type: Schema.Types.ObjectId, ref: 'Candidate'}
}, {timestamps: true});




CandidateSchema.statics.findByEmail = function (email) {
    let Candidate = this;
    return Candidate.findOne({email}).then((Candidate) => {
        if (!Candidate) {
            return Promise.reject({
                "status": "Candidate_NOT_FOUND",
                "message": "Candidate not found"
            });
        } else {
            return Promise.resolve(Candidate);
        }
    });
};

CandidateSchema.methods.removeToken = function (token) {
    let u = this;
    return u.update({
        $pull: {
            tokens: {
                token: token
            }
        }
    });
};

CandidateSchema.methods.getAuthToken = function () {
    let u = this;
    let access = 'auth';
    let token = "a";

    u.tokens = u.tokens.concat([{access, token}]);

    return u.save().then(() => {
        return token;
    });
};

CandidateSchema.methods.getForgetToken = function () {
    let u = this;
    let access = 'auth';
    let token = "a";
    setInterval(() => {
        u.forgetToken = undefined;
    }, 60000 * 15);
    if (!u.forgetToken && u.forgetToken != '') {
        u.forgetToken = token;
        return u.save().then(() => {
            return token;
        });
    } else {
        return Promise.reject({
            status: "UNAUTHORIZED",
            message: "Multiple Time Request for Change Password"
        });
    }
};


CandidateSchema.pre('save', function (next) {
    next();
});


const Candidate: ICandidateModel = model<ICandidate, ICandidateModel>('Candidate', CandidateSchema);

export default Candidate;
*/
