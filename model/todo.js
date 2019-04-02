let mongoose=require('mongoose');

let todoSchema=mongoose.Schema({
action:{
type: String,
required: true
},
status:{
type:String,
required: true
}
},{ collection: 'tododata' });

let todo= module.exports= mongoose.model('todo',todoSchema);
