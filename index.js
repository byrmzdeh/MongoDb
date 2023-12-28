import express from 'express'
import mongoose, { Schema } from 'mongoose';
import 'dotenv/config'

const app = express()
const port = 8000


app.use(express.json())

const usersSchema = new Schema({
    username: String,
    email: String,
    password: String,
    age: Number,
    isMarried: Boolean
});

const userModel = mongoose.model('user', usersSchema);



app.get('/', async (req, res) => {
    const users = await userModel.find({});
    res.send(users)
})

app.get('/:id', async (req, res) => {
    const { id } = req.params
    const users = await userModel.findById(id)
    res.send(users)
})

app.post('/', async (req, res) => {
    const { username, email, password, age, isMarried } = req.body
    const newUser = new userModel({ username, email, password, age, isMarried });
    await newUser.save();
    res.send('User Yarandi !')
    console.log(process.env.PORT);
})


app.delete('/:id', async (req, res) => {
    const { id } = req.params
    const users = await userModel.findByIdAndDelete(id)
    res.send(users)
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    const { username, email, password, age, isMarried } = req.body
    const users = await userModel.findByIdAndUpdate(id , { username, email, password, age, isMarried } )
    res.send(users)
})


mongoose.connect(process.env.SECRET_HASH)
    .then(() => console.log("Connected !"))
    .catch((err) => console.log("Not Connected !"))


app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})



