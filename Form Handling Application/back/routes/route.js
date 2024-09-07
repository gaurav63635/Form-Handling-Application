const express=require("express");
const router=express.Router();
const RegForm=require("../models/RegForm.js");

// Route to create new employee:
router.post("/newEmployee",async(req,res)=>{
    try{
        const newEmployee=new RegForm(req.body);
        const saved= await newEmployee.save();
        if(saved){
            res.status(201).json({message:"Data Submitted ",newEmployee});

        }else{
            res.status(404).json({error:"error occur"});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error:"server error occur",error});
    }
});

// Route to fetch information of a Employee
router.get("/newEmployee",async(req,res)=>{
    try{
        const data=await RegForm.find();
        res.status(201).send(data);
    }catch(error){
    res.status(500).json({error:"server error occur",error});
    }
});

// Route to delete an Employee using id
router.delete("/newEmployee/:id",async(req,res)=>{
    try{
        const id=req.params.id;
    const data=await RegForm.findByIdAndDelete(id); 
    if(!data){
        return res.status(404).json({message:"employee not found"});

    }
      res.status(200).json({message:"Data Deleted Successfully",data});
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Server Error Occurs ", error }); 
    }

});

//update employee using id
router.patch("/newEmployee/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const data=await RegForm.findByIdAndUpdate(id, req.body);
        res.status(201).json({message:" Data Updated Successfully",data});
    }catch (error) {
        console.log(error);
        res.status(500).json({error: " Server Error Occurs in Employee Database ", error});
    }
    
});

module.exports=router;


