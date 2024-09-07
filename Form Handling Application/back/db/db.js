const mongoose=require("mongoose");
const DB=process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log("Database Connected successfully");

})
.catch((error)=>{
    console.log("Error in Connection",error);
});



