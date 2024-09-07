const mongoose =require("mongoose");

const employeeSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },

    Address:{
        type:String,
        requires:true,
    },

    State:{
        type:String,
        required:true,
    },

    Country:{
        type:String,
        require:true,
    },

    Qualification:{
        type:String,
        required:true,
    },

    Religion:{
        type:String,
        required:true,
    }
});
module.exports= mongoose.model("RegForm",employeeSchema);
