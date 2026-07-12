const Table=require("../models/table");
const Reservation=require("../models/reservation")
async function getAllTables(req,res){
    try{
        const tables=await Table.find();
        res.json(tables);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

async function createTable(req,res){
    try{
        const table= await Table.create(req.body);
        res.status(201).json(table);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

async function updateTable(req,res){
    const id=req.params.id;
    const {number,capacity}=req.body; 
    const table=await Table.findByIdAndUpdate(id,{number,capacity},{new:true});
    res.json(table);
}

async function deleteTable(req,res){
    await Table.findByIdAndDelete(req.params.id);
    res.json({message:"Table deleted successfully"});
};

async function getAvailableTables(req,res){
    try{
        const {date,time,guestCount}=req.query;
        const tables=await Table.find({capacity:{$gte:guestCount}});
        const availableTables=[];   
        for(const table of tables){
            const existingReservation=await Reservation.findOne({table:table._id,date,time,status:{$in:['pending','confirmed']}});
            if(!existingReservation){
                availableTables.push(table);
            }
        }
        res.json(availableTables);

    }catch(err){
        res.status(500).json({message:err.message});
    }
}


module.exports={getAllTables,createTable,updateTable,deleteTable,getAvailableTables};