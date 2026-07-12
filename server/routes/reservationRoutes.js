const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const checkRole = require('../middlewares/role');

const {createReservation, handleMyReservations, cancelReservation, getAllReservations, getReservationByDate, updateReservation, dashboardStats} = require('../controllers/reservation');

router.post('/', authMiddleware, createReservation);
router.get('/my', authMiddleware, handleMyReservations);

router.delete('/:reservationId/cancel', authMiddleware, cancelReservation);       

router.get('/', authMiddleware, checkRole('admin'), getAllReservations);
router.get('/date/:date', authMiddleware, checkRole('admin'), getReservationByDate); 
router.put('/:reservationId', authMiddleware, checkRole('admin'), updateReservation);
router.get('/stats', authMiddleware, checkRole('admin'), dashboardStats);

module.exports = router;