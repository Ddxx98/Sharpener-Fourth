const express = require('express')
const fs = require('fs')
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

const msg = express.Router()

msg.get("/", (req, res) => {
    if (!localStorage.getItem("username")) {
        return res.redirect('/login');
    }
    fs.readFile("messages.json", (err, data) => {
        const messages = err ? [] : JSON.parse(data);
        const messagesHTML = messages.map(
            (msg) => `<p><strong>${msg.username}:</strong> ${msg.message}</p>`
        ).join('');
        res.send(`<div>${messagesHTML}</div><form action="/msg" method="POST"><label>Message:<input type="text" name="msg"></label><button type="submit">Send</button></form>`)
    })
})

msg.post("/", (req, res) => {
    const message = req.body.msg;
    const currentUsername = localStorage.getItem("username")
    fs.readFile('messages.json', (err, data) => {
        const messages = err ? [] : JSON.parse(data);
        messages.unshift({ username: currentUsername, message });

        fs.writeFile('messages.json', JSON.stringify(messages), (err) => {
            if (err) console.error(err);
            res.redirect('/msg');
        });
    });
})

module.exports = msg