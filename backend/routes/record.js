const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn"); 
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET;

 
recordRoutes.route("/items").get(function (req, res) {
 let db_connect = dbo.getDb("nelly_ecommerce_db");
 db_connect
   .collection("products")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

recordRoutes.route("/cartCounter").get(function (req, res) {
  let db_connect = dbo.getDb("nelly_ecommerce_db");
  db_connect
    .collection("cart")
    .find({})
    .count(function(err, count) 
    {
        if (err) throw err;
        res.json(count);

    });
 });


recordRoutes.route("/categories").get(function (req, res) {
  let db_connect = dbo.getDb("nelly_ecommerce_db");
  db_connect
    .collection("categories")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

recordRoutes.route("/wishlist").get(function (req, res) {
 let db_connect = dbo.getDb("nelly_ecommerce_db");
 db_connect
 .collection("wishlist")
 .find({})
 .toArray(function (err, result) {
   if (err) throw err;
   res.json(result);
 })
 });


 recordRoutes.route("/orders").get(function (req, res) {
  let db_connect = dbo.getDb("nelly_ecommerce_db");
  db_connect
    .collection("orders")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 recordRoutes.route("/users").get(function (req, res) {
  let db_connect = dbo.getDb("nelly_ecommerce_db");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });


recordRoutes.route("/cartItems").get(function (req, res) {
  let db_connect = dbo.getDb("nelly_ecommerce_db");
  db_connect
    .collection("cart")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });


recordRoutes.route("/item/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("products")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 

recordRoutes.route("/items/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   title: req.body.title,
   price: req.body.price,
   upFile: req.body.upFile,
   description: req.body.description
 };
 db_connect.collection("products").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});



recordRoutes.route("/register").post(function (req, response) {
  let db_connect = dbo.getDb("nelly_ecommerce_db");
  const getDate = new Date();
  db_connect
  .collection("users")
  .findOne({email: req.body.email}, function (err, result) {
    if (result) {
      console.log("User already exists");
      return response.json("error")
    } else {
      let username = req.body.username;
      let email = req.body.email;
      let password = req.body.password;
      let phone = req.body.phone;
      let date = getDate;
     const saltRounds = 10;
     bcrypt.genSalt(saltRounds, function (saltError, salt) {
       if (saltError) {
         throw saltError
       } else {
         bcrypt.hash(password, salt, function(hashError, hash) {
           if (hashError) {
             throw hashError
           } else {
             let myobj = {username, email, hash, phone, date}
             db_connect.collection("users").insertOne(myobj, function (err, res) {
               if (err) throw err;
               return response.json({status: "ok", data: res});
             });
           }
         })
       }
     })
    }
  });
 });

 recordRoutes.route("/login").post(function (req, response) {
  let db_connect = dbo.getDb("nelly_ecommerce_db");
  let password = req.body.password;
  let getUserEmail = { email: req.body.email};
  db_connect
  .collection("users")
  .findOne(getUserEmail, function (err, result) {
    if(!result) {
      return response.json("error")
    } 
    if(result) {
      const getHash = result.hash;
      const getEmail = result.email;
     if(bcrypt.compare(password, getHash)) {
      const token = jwt.sign({email: getEmail}, JWT_SECRET, {
        expiresIn: 1200000
      });
      if(response.status(201)) {
        return response.json({status: "ok", data: token})
      } else {
        return response.json({error: "Error"})
      }
    }
    return response.json({status: "error", error: "Invalid password"})
    } 
  });
 });

 recordRoutes.route("/success").post(function (req, response) {
  const {token} = req.body;
  try{
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if(err){
        return "token expired";
      }
      else {
        return res;
      }
    });
    if(user === "token expired"){
      return response.json({status: "error", data: "token expired"})
    }
    const getEmail = user.email;
    let db_connect = dbo.getDb("nelly_ecommerce_db");
    db_connect
    .collection("users")
    .findOne({email: getEmail})
    .then((data) => {
      response.json({status: "ok", data: data})
    })
    .catch((error) => {
      response.json({status: "error", data: error})
    });
  } catch (error) {}
})

recordRoutes.route("/items/order").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
  };
  db_connect.collection("orders").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });

recordRoutes.route("/items/addToCart").post(function (req, response) {
  let db_connect = dbo.getDb();
  const getDate = new Date();
  let myobj = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    upFile: req.body.upFile,
    itemId: req.body.itemId,
    userid: req.body.userid,
    date: getDate,
  };
  db_connect.collection("cart").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });

 recordRoutes.route("/items/addToWishList").post(function (req, response) {
  let db_connect = dbo.getDb();
  const getDate = new Date();
  let myobj = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    upFile: req.body.upFile,
    itemId: req.body.itemId,
    userid: req.body.userid,
    date: getDate,
  };
  db_connect.collection("wishlist").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });


 
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("products")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});

// recordRoutes.route("/:id").delete((req, response) => {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  db_connect.collection("products").deleteOne(myquery, function (err, obj) {
//    if (err) throw err;
//    console.log("1 document deleted");
//    response.json(obj);
//  });
// });

recordRoutes.route("/delCartItem/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("cart").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
 });
 
module.exports = recordRoutes;