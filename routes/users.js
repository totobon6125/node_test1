import express from 'express';
import userDB from '../schemas/user.js';

// Express.js의 라우터를 생성합니다.
const router = express.Router();


// 회원 가입 API : POST
router.post("/", async (req, res) => {
    try {
        const { name, ID, pw } = req.body
        if (!name || !ID || !pw) {
            res.status(400).json({ message: "입력한 값이 올바르지 않습니다." })
        }
        await userDB.create({
            name,
            ID,
            pw
        })
        return res.status(201).json({ message: `${name}님이 회원가입 되셨습니다.` });
    } catch (err) {
        console.log(err)
    }
})

// 회원 명단 조회 API : GET
router.get("/", async (req, res) => {
    try {
        const users = await userDB.find().sort({ createdAt: -1 }).exec()
        const allUsers = users.map((user) => {
            return {
                userId: user['_id'],
                name: user['name'],
                ID: user['ID'],
                pw: user['pw']
            }
        })
        return res.status(200).json({ data: allUsers })
    } catch (err) {
        console.log(err)
    }
})

// 회원 명단 상세 조회 API : GET
router.get("/:_userId", async (req, res) => {
    try {
        const userId = req.params
        console.log("여깁니다!", userId)
        // if (!_postId) {
        //     return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다' })
        // }

        const users = await userDB.findById({ _id: userId["_userId"] }).exec()
        console.log("여깁니다2!!", users)

        const oneUser = {
            "userId": users["_id"],
            "name": users["name"],
            "ID": users["ID"],
            "pw": users["pw"]
        }
        return res.status(200).json({ data: oneUser })
    } catch (err) {
        console.log(err)
    }
})

export default router;