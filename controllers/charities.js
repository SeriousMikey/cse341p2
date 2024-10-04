const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;


const getAll = async (req, res) => {
    mongodb
    .getDatabase()
    .db()
    .collection("charities")
    .find()
    .toArray()
    .then((err, charity) => {
        if (err) {
            res.status(500).json({ message: err});
        }
        else {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(charity);
        }
    });
};

const getSingle = async (req, res) => {
    const charityId = ObjectId.createFromHexString(req.params.Id);
    mongodb
    .getDatabase()
    .db()
    .collection("charities")
    .find({ _id: charityId })
    .toArray()
    .then((err, charities) => {
        if (err) {
            res.status(500).json({ message: err});
        }
        else {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(charities[0]);
        }
    });
};

const createCharity = async (req, res) => {
    const charity = {
        charity_name: req.body.charity_name,
        charity_description: req.body.charity_description,
        charity_amount_raised: req.body.charity_amount_raised
    };

    const response = await mongodb.getDatabase().db().collection("charities").insertOne(charity);

    console.log(response);

    if (response.acknowledged) {
        res.send(`New charityId: ${response.insertedId}`);
    }
    else {
        res.status(500).json(response.error || "An error occurred while creating the charity.");
    }
}

const updateCharity = async (req, res) => {
    if (!ObjectId.isValid(req.params.Id)) {
        res.status(400).json("Must use a valid donor id to update charity.");
    }
    const charityId = ObjectId.createFromHexString(req.params.Id);
    const charity = {
        charity_name: req.body.charity_name,
        charity_description: req.body.charity_description,
        charity_amount_raised: req.body.charity_amount_raised
    };

    const response = await mongodb.getDatabase().db().collection("charities").replaceOne({ _id: charityId }, charity);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "An error occurred while updating the charity.");
    }
}

const deleteCharity = async (req, res) => {
    if (!ObjectId.isValid(req.params.Id)) {
        res.status(400).json("Must use a valid donor id to delete charity.");
    }
    const charityId = ObjectId.createFromHexString(req.params.Id);
    const response = await mongodb.getDatabase().db().collection("charities").deleteOne({ _id: charityId });

    if (response.deletedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "An error occurred while deleting the charity.");
    }
}

const updateCharityThroughDonation = async (charity, amount_donated) => {
    const new_amount_raised = charity.charity_amount_raised + amount_donated;
    const updated_charity = {
        charity_name: charity.charity_name,
        charity_description: charity.charity_description,
        charity_amount_raised: new_amount_raised
    };

    const response = await mongodb.getDatabase().db().collection("charities").replaceOne({ _id: charity.charityId }, updated_charity);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "An error occurred while updating the charity.");
    }
}

module.exports = {
    getAll,
    getSingle,
    createCharity,
    updateCharity,
    deleteCharity,
    updateCharityThroughDonation
}