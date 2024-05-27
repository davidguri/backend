import express from 'express'
import universityRoutes from "./universities"
import studentRoutes from "./students"
import teacherRoutes from "./teachers"
import adminRoutes from "./admin"
import classRoutes from "./classes"
import gradeRoutes from "./grades"

const router = express.Router()

router.use('/universities', universityRoutes)
router.use('/students', studentRoutes)
router.use('/teachers', teacherRoutes)
router.use('/admin', adminRoutes)
router.use('/class', classRoutes)
router.use('/grade', gradeRoutes)

export default router