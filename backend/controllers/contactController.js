const Contact = require("../models/contact")

  const contactUs = async(req, res) =>{
    try {
        const newContact = new Contact({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            message: req.body.message,
          });
          
      await newContact.save();
      res.status(200).send({ message: 'Form data saved successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error saving form data' });
    }
  }



const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).send(contacts);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching contact data' });
    }
}


  module.exports = {
    contactUs,
    getContacts
  }