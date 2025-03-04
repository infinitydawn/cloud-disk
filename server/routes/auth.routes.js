const Router = require("express")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const config = require("config")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")
const router = new Router()
const authMiddleware = require("../middleware/auth.middleware.js")
const fileService = require("../services/fileService.js")
const File = require("../models/File.js")

router.post("/registration",
    [
        check("email", "Incorrect Email.").isEmail(),
        check("password", "Password Invalid: Pass must be between 3 & 12 characters").isLength({ min: 3, max: 12 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return req.status(400).json({ message: "Invalid Registration Data", errors })
            }

            const { email, password } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: `User with email ${email} already exists` })
            }

            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({ email, password: hashPassword })

            await user.save()

            await fileService.createDir(new File({user:user.id, name: ``}))

            return res.json({ message: "User was created." })
        } catch (e) {
            console.error(e)
            res.send({ message: "Server Error", error: e })
        }
    })


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User not found." })
        }

        const isPassValid = bcrypt.compareSync(password, user.password)

        if (!isPassValid) {
            return res.status(400).json({ message: "Invalid Password" })
        }

        const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "1h" })

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        })
    } catch (e) {
        console.error(e)
        res.send({ message: "Server Error", error: e })
    }
})



router.get("/auth", authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.user.id })

            const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "1h" })

            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.error(e)
            res.send({ message: "Server Error", error: e })
        }
    })

module.exports = router