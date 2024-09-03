import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
    title: {type:String,
    required: true},
    completed:{
        type: Boolean,
        default: false,
    },
})

const TaskSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
    },
    desc:{
        type:String,
        required:true,
    },
    dueDate:{
        type:Date,
    },
    labels:[String],
    frequency:{
        type: String,
        enum:['Daily','Weekly','Monthly','Custom']
    },
    priority:{
      type: String,
      enum:['Low','Medium','High'],  
    },
    reminder:Date,
    status:{
        type: String,
        enum:[
            'Today', 'Tomorrow', 'Yesterday', 'Day Name', 'Not Started',
            'Pending', 'Upcoming', 'Completed', 'Deleted', 'Created'
        ],
        defalult: 'Not Started',
    },
    subtasks:[subtaskSchema],
    isCompleted:{
        type:Boolean,
        default:false,
        //required:true,
    },
    createdAt:{
        type: Date, default: Date.now
    },
    updatedAt:{
        type: Date, default: Date.now
    }
    
});

export default mongoose.model("Task",TaskSchema);