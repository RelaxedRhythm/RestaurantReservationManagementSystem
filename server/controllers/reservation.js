
const Reservation = require('../models/reservation');
const Table = require('../models/table');

async function createReservation(req, res) {
    try{
        console.log("1. Entered createReservation");

        const { date, guestCount, time } = req.body;
         console.log("2. Body:", req.body);

        console.log("3. User:", req.user);

        const tables=await Table.find({ capacity: { $gte: guestCount } }).sort({ capacity: 1 });
        console.log("4. Tables found:", tables.length);
        for(const table of tables){
            const existingReservation=await Reservation.findOne({ table: table._id, date, time,status: { $in: ['pending', 'confirmed'] } });
            if(!existingReservation){
                console.log("7. Creating reservation");
                const reservation=new Reservation({
                    user:req.user._id,
                    table:table._id,
                    date,
                    guestCount,
                    time
                });
                await reservation.save();
                return res.status(201).json({ message: 'Reservation created successfully', reservation
                 });
            }
        }
            res.status(400).json({ message: 'No available tables for the selected date and time' });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function handleMyReservations(req, res) {
    try{
        const reservations=await Reservation.find({ user: req.user._id,status: { $ne: "cancelled" } }).populate('table');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function cancelReservation(req, res) {
    const { reservationId } = req.params;

    try {
        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            return res.status(404).json({
                message: "Reservation not found"
            });
        }

        const isOwner =
            reservation.user.toString() === req.user._id.toString();

        const isAdmin = req.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                message: "You are not authorized to cancel this reservation"
            });
        }

        reservation.status = "cancelled";
        await reservation.save();

        res.json({
            message: "Reservation cancelled successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function getAllReservations(req, res) {
    try{
        const reservations=await Reservation.find().populate('user','name email').populate('table');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function getReservationByDate(req, res) {
    try{
        const { date } = req.params;
        const reservations=await Reservation.find({ date }).populate('user','name email').populate('table');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function updateReservation(req, res) {
    const { reservationId } = req.params;
    const { date, time, guestCount } = req.body;
    try{
        const reservation=await Reservation.findById(reservationId);
        if(!reservation){
            return res.status(404).json({ message: 'Reservation not found' });
        }   
        if(date) reservation.date=date;
        if(time) reservation.time=time;
        if(guestCount) reservation.guestCount=guestCount;
        await reservation.save();
        res.json({ message: 'Reservation updated successfully', reservation });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function dashboardStats(req, res) {

    const totalReservations = await Reservation.countDocuments();

    const activeReservations = await Reservation.countDocuments({
        status: "pending" || "confirmed"
    });

    const cancelledReservations = await Reservation.countDocuments({
        status: "cancelled"
    });

    const totalTables = await Table.countDocuments();

    res.json({

        totalReservations,
        activeReservations,
        cancelledReservations,
        totalTables

    });

};



module.exports={ createReservation, handleMyReservations, cancelReservation, getAllReservations, getReservationByDate, updateReservation,dashboardStats };