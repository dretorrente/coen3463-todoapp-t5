let Moment = require('moment-timezone');
var datetime = require('node-datetime');
var dt;
var formattedDate;

dt = datetime.create();
var formatted = dt.format('m/d/Y');

let dateTodo = Moment().tz('Singapore').format().replace(/T/, ' ').replace(/\+/g, ' ');
let dateStatus = Moment().tz('Singapore').format('ha z').slice(1,4);
let dateSlice = formatted + ' ' + dateTodo.slice(11,18) + dateStatus;
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const todoSchema = new Schema({
    name:{
        type: String,
        required: [true,"Todo is empty"]
    },
    owner:{
        type: Schema.Types.ObjectId, ref: 'User',
        required: [true,"User id is undefined"]
    },
    createdDate: { type: String, default:  dateSlice},
    isCompleted: {type: Boolean, default: false},
    isChecked: {type: Boolean, default: false}
    // completeDate: {type: Date, default: null},

    // type: {
    //     type: String,
    //     required: true,
    //     enum: ['active', 'completed']
    // new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    // }
});


module.exports = mongoose.model('Todo', todoSchema);