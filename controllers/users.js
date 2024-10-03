const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;


const getAll = async (req, res) => {
    const response = await mongodb.getDatabase().db().collection("users").find();
    response.toArray().then((contact) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contact);
    });
};

const getSingle = async (req, res) => {
    const contactId = ObjectId.createFromHexString(req.params.Id);
    const response = await mongodb.getDatabase().db().collection("users").find({ _id: contactId });
    response.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]);
    });
};

const createContact = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db().collection("users").insertOne(contact);

    console.log(response);

    if (response.acknowledged) {
        res.send(`New userId: ${response.insertedId}`);
    }
    else {
        res.status(500).json(response.error || "An error occurred while creating the contact.");
    }
}

const updateContact = async (req, res) => {
    const contactId = ObjectId.createFromHexString(req.params.Id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db().collection("users").replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "An error occurred while updating the contact.");
    }
}

const deleteContact = async (req, res) => {
    const contactId = ObjectId.createFromHexString(req.params.Id);
    const response = await mongodb.getDatabase().db().collection("users").deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "An error occurred while deleting the contact.");
    }
}

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
}