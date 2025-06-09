import express from "express";
const router = express.Router();

import TaskModel from "./userModel.js"

router.get("/users", async(req, res)=>{
    
    try {
        const findUser = await TaskModel.find();
        res.status(200).json(findUser);
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
})

router.post("/users", async(req, res)=>{
   
   
try {
    const {name, age, weight} = req.body;
    const newUser = new TaskModel({name, age, weight});
    await newUser.save()
    res.status(201).json({ message: "User created successfully", user: newUser });
} catch (error) {
    res.status(500).json({
            success:false,
            message: error.message
        })
}
})

router.put("/users/:id", async(req, res)=>{
    
    const {id} = req.params;
    const {name, age, weight} = req.body;
    try {
        const updateUser = await TaskModel.findByIdAndUpdate(
            id, {name, age, weight});

        if(!updateUser){

            res.json({
                message: "user not found"
            })
        }
        res.status(200).json({
            success:true,
            TaskModel:updateUser    
        })
        
    } catch (error) {
    res.status(500).json({
            success:false,
            message: error.message
        })
}
})

router.delete("/users/:id", async(req, res)=>{
    const {id} = req.params;

    try {
        const deleteUser = await TaskModel.findByIdAndDelete(id);

        if(!deleteUser){
            res.json({
                message: "user not found"
            })
        }
        
            res.status(200).json({
                success:true,
                message:"user deleted succesfully",
                TaskModel:deleteUser
            })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
})

export default router;