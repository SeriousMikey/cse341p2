const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;


const getAll = async (req, res) => {
    mongodb
    .getDatabase()
    .db()
    .collection("donors")
    .find()
    .toArray((err, donors) => {
        if (err) {
            res.status(500).json({ message: err});
        }
        else {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(donors);
        }
    });
};

const getSingle = async (req, res) => {
    const donorId = ObjectId.createFromHexString(req.params.Id);
    mongodb.
    getDatabase()
    .db()
    .collection("donors")
    .find({ _id: donorId })
    .toArray((err, donors) => {
        if (err) {
            res.status(500).json({ message: err});
        }
        else {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(donors[0]);
        }
    });
};

const createAccount = async (req, res) => {
    const donor = {
        donor_firstname: req.body.donor_firstname,
        donor_middlename: req.body.donor_middlename,
        donor_lastname: req.body.donor_lastname,
        donor_age: req.body.donor_age,
        donor_gender: req.body.donor_gender,
        donor_donations_made: req.body.donor_donations_made,
        donor_amount_donated: req.body.donor_amount_donated,
        donor_email: req.body.donor_email
    };

    const response = await mongodb.getDatabase().db().collection("donors").insertOne(donor);

    console.log(response);

    if (response.acknowledged) {
        res.send(`New donorId: ${response.insertedId}`);
    }
    else {
        res.status(500).json(response.error || "An error occurred while creating the donor.");
    }
}

const updateAccount = async (req, res) => {
    if (!ObjectId.isValid(req.params.Id)) {
        res.status(400).json("Must use a valid donor id to update account.");
    }
    const donorId = ObjectId.createFromHexString(req.params.Id);
    const donor = {
        donor_firstname: req.body.donor_firstname,
        donor_middlename: req.body.donor_middlename,
        donor_lastname: req.body.donor_lastname,
        donor_age: req.body.donor_age,
        donor_gender: req.body.donor_gender,
        donor_donations_made: req.body.donor_donations_made,
        donor_amount_donated: req.body.donor_amount_donated,
        donor_email: req.body.donor_email
    };

    const response = await mongodb.getDatabase().db().collection("donors").replaceOne({ _id: donorId }, donor);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "An error occurred while updating the donor.");
    }
}

const deleteAccount = async (req, res) => {
    if (!ObjectId.isValid(req.params.Id)) {
        res.status(400).json("Must use a valid donor id to delete account.");
    }
    const donorId = ObjectId.createFromHexString(req.params.Id);
    const response = await mongodb.getDatabase().db().collection("donors").deleteOne({ _id: donorId });

    if (response.deletedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "An error occurred while deleting the donor.");
    }
}

const updateAccountThroughDonation = async (donor, donation_amount) => {
    const new_amount_donated = donor.donor_amount_donated + donation_amount;
    const new_donations_made = donor.donor_donations_made + 1;
    const updated_donor = {
        donor_firstname: donor.donor_firstname,
        donor_middlename: donor.donor_middlename,
        donor_lastname: donor.donor_lastname,
        donor_age: donor.donor_age,
        donor_gender: donor.donor_gender,
        donor_donations_made: new_donations_made,
        donor_amount_donated: new_amount_donated,
        donor_email: donor.donor_email
    };

    const response = await mongodb.getDatabase().db().collection("donors").replaceOne({ _id: donor.donorId }, updated_donor);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "An error occurred while updating the donor.");
    }
}

module.exports = {
    getAll,
    getSingle,
    createAccount,
    updateAccount,
    deleteAccount,
    updateAccountThroughDonation
}