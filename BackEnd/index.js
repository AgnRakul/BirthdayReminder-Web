const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const mongoDb = 'mongodb+srv://MonkAno:MonkAno@cluster0.cfvup.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const app = express();
const port = 9000;
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'rakul0agn@gmail.com',
        pass: "rjebvgndlnczjrau",
    },
})

function mailer(mail) {
    transporter.sendMail({
        from: `"Rakul"  <rakul0agn@gmail.com>`,
        to: mail,
        subject: "Birthday is Recorded",
        // text: rand.toString(),
        text: "Your Frnd Birthday as been Recoreded"

    }).then(console.log("Response Sended"));
}


// Submit Data

app.get('/Submit', cors(), (req, res) => {

    let userName = req.query.userName;
    let userMailId = req.query.userMailId;
    let eventName = req.query.eventName;
    let date = req.query.date
    // let date = dater();
    let userData = {
        Username: userName,
        UserMailId: userMailId,
    }
    let UserDetial = {
        UserMailId: userMailId,
        EventName: eventName,
        Date: date
    }


    async function createListing(client, newListing, userListing, response) {
        const UserData = await client
            .db("USERDATA")
            .collection("USER")
            .insertOne(newListing); // MongoDB Function

        const UserDetials = await client
            .db("USERDATA")
            .collection("DETIALS")
            .insertOne(userListing);


        if (UserData.acknowledged === true && UserDetials.acknowledged === true) {
            res.send(
                "<script>alert('Your Complaint is recorded '); </script>"
            );
            mailer(userMailId) // window.location.href = page redircetor
        } else {
            console.log("Data Not Inserted");
            response.json({ status: false });
        }
    }

    async function main() {
        const uri = mongoDb;


        const client = new MongoClient(uri);

        try {
            await client.connect();
            const pen = await createListing(client, userData, UserDetial, res);
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }
    main().catch(console.error);

})


// Find Data

app.get('/Find', cors(), (req, res) => {

    let dateFinder = new Date()
    async function findListings(client) {
        const findDate = client.db("USERDATA").collection("DETIALS").find({ 'Date': dateFinder }); // find to display all the collected values
        const results = await cursor.toArray();
        res.json(results);
    }

    async function main() {
        const uri = mongoDbUrl;

        const client = new MongoClient(uri);

        try {
            await client.connect();
            const pen = await findListings(client, res);
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }
    main().catch(console.error);

})

app.listen(port, () => console.log(`Listening to Port ${port}`));


function dater() {
    var Dater = new Date();

    Dater.setDate(Dater.getDate());

    MyDateString = (Dater.getFullYear() + '-' + ('0' + (Dater.getMonth() + 1)).slice(-2) + '-' + ('0' + Dater.getDate()).slice(-2));

    return MyDateString;

}
























// UserName 
// User Mail id 
// Event Name 
// Date


