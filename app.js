const express    = require('express'),
      app        = express(),
      firebase   = require('firebase'),
      bodyParser = require('body-parser');

//ejs file config
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

//firebase config
var firebaseConfig = {
    apiKey: "AIzaSyCA85sgP1qLC7NIBnij_vtiicXseRULjbg",
    authDomain: "biocom-task-1.firebaseapp.com",
    databaseURL: "https://biocom-task-1.firebaseio.com",
    projectId: "biocom-task-1",
    storageBucket: "biocom-task-1.appspot.com",
    messagingSenderId: "506613726306",
    appId: "1:506613726306:web:e93dd2d51fcb6a5e56e53b",
    measurementId: "G-6SRHCR16RQ"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

app.get('/home',(req,res) => {
    res.render('homepage');
});

app.get('/login',(req,res) => {
    res.render('login');
});

app.get('/signup',(req,res) => {
    res.render('signup');
})

app.post('/signup',async (req,res) => {
    //let name, email, password = req.body;
    const newuser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    try {
        await db.collection('users').doc('/' + newuser.name + '/')
        .set(newuser);
        return res.redirect('/home');
    } catch(error) {
        console.log(error);
        return res.status(400).send(error);
    }
});

app.post('/login',async (req,res) => {
    try {
        const usrdocument = db.collection('users').doc(req.body.name);
        let usr = await usrdocument.get();
        console.log(usr);
        let usrdata = usr.data();
        let email, password = req.body;
        if(req.body.email === usrdata.email && req.body.password === usrdata.password) {
            return res.redirect('/home');
        } else {
            return res.send('Invalid Credentials!');
        }
    } catch(error) {
        console.log(error);
        return res.status(400).send(error);
    }
})

app.listen(process.env.PORT, () => {
    console.log('server started running...');
});