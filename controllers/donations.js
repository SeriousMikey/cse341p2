const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const donorsController = require("./donors");
const charitiesController = require("./charities")


const getAll = async (req, res) => {
    mongodb
    .getDatabase()
    .db()
    .collection("donations")
    .find()
    .toArray()
    .then((err, donation) => {
        if (err) {
            res.status(500).json({ message: err});
        }
        else {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(donation);
        }
    });
};

const getSingle = async (req, res) => {
    const donationId = ObjectId.createFromHexString(req.params.Id);
    mongodb
    .getDatabase()
    .db()
    .collection("donations")
    .find({ _id: donationId })
    .toArray()
    .then((err, donations) => {
        if (err) {
            res.status(500).json({ message: err});
        }
        else {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(donations[0]);
        }
    });
};

const createDonation = async (req, res) => {
    const donation = {
        donation_donor_id: req.body.donation_donor_id,
        donation_charity_id: req.body.donation_charity_id,
        donation_amount: req.body.donation_amount,
        donation_message: req.body.donation_message
    };

    const response = await mongodb.getDatabase().db().collection("donations").insertOne(donation);

    console.log(response);

    if (response.acknowledged) {
        updateDonorAndCharity(donation.donation_donor_id, donation.donation_charity_id, donation.donation_amount);
        res.send(`New donationId: ${response.insertedId}`);
    }
    else {
        res.status(500).json(response.error || "An error occurred while creating the donation.");
    }
}

const updateDonorAndCharity = async (donor_id, charity_id, donation_amount) => {
    const donor = donorsController.getSingle(donor_id);
    donorsController.updateAccountThroughDonation(donor, donation_amount);

    const charity = charitiesController.getSingle(charity_id);
    charitiesController.updateCharityThroughDonation(charity, donation_amount);
}

module.exports = {
    getAll,
    getSingle,
    createDonation,
    updateDonorAndCharity
}