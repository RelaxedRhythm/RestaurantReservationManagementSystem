const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/auth");
const checkRole=require("../middlewares/role");

const {getAllTables,createTable,updateTable,deleteTable,getAvailableTables}=require("../controllers/table");
router.get("/",authMiddleware,checkRole("admin"),getAllTables);
router.post("/",authMiddleware,checkRole("admin"),createTable);
router.put("/:id",authMiddleware,checkRole("admin"),updateTable);
router.delete("/:id",authMiddleware,checkRole("admin"),deleteTable);
router.get("/available",authMiddleware,getAvailableTables);

module.exports = router;