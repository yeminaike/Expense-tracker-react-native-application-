import express from 'express'
import { createTransaction, deleteTransaction, getSummaryByUserId, getTransactionsByUserId } from '../controllers/transactionsControllers.js';


const router = express.Router();

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "You have got this Yemo! Believe in yourself!!!" });
});

router.get("/summary/:userId", getSummaryByUserId )
router.get("/:userId", getTransactionsByUserId)
router.delete("/:id", deleteTransaction)
router.post('/', createTransaction)
export default router;
