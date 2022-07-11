
require('dotenv').config();
const mongoose = require('mongoose');
const mongo = process.env['MONGO_URI'];

mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let janeFoster = new Person({
    name: "Jane Foster",
    age: 84,
    favoriteFoods: ["eggs", "fishs", "dicks"]
  });
  janeFoster.save((err, data)=> {
    if(err) return console.log(err);  
    done(null , data);
  });
  
};
let arrayOfPeople = [{
    name: "Jane Foster",
    age: 84,
    favoriteFoods: ["eggs", "fishs", "dicks"]
  },{
    name: "Thor Odinson",
    age: 300,
    favoriteFoods: ["eggs", "fishs", "dicks"]
  },{
    name: "Loki Odinson",
    age: 250,
    favoriteFoods: ["eggs", "fishs", "dicks"]
  }]

let createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if(err) return console.log(err);
    done(null , data);
  });

};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if(err) return console.log(err);
    done(null , data);
  })
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if(err) return console.log(err);
    done(null , data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err,data) => {
    if(err) return console.log(err);
    done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
Person.findById(personId, (err,person) => {
  if(err) return console.log(err);
  person.favoriteFoods.push(foodToAdd);
  person.save((err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
})
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data)=> {
  if(err) return console.log(err);
  done(null, data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name:1})
    .limit(2)
    .select({age:0})
    .exec((err,data) => {
    if(err) return console.log(err);
    done(null , data);
  })
  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
