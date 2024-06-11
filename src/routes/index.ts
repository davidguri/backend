import express from 'express'
import universityRoutes from "./universities"
import usersRoutes from "./users"
import classRoutes from "./classes"
import gradeRoutes from "./grades"

const router = express.Router()

router.use('/universities', universityRoutes)
router.use('/users', usersRoutes)
router.use('/classes', classRoutes)
router.use('/grades', gradeRoutes)

export default router