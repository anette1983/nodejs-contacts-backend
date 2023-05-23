const express = require("express");

const router = express.Router();
const { nanoid } = require("nanoid");
const contactsOperations = require("../../models/contacts");
// const contacts = [
//   {
//     id: "AeHIrLTr6JkxGE6SN-0Rw",
//     name: "Allen Raymond",
//     email: "nulla.ante@vestibul.co.uk",
//     phone: "(992) 914-3792",
//   },
//   {
//     id: "qdggE76Jtbfd9eWJHrssH",
//     name: "Chaim Lewis",
//     email: "dui.in@egetlacus.ca",
//     phone: "(294) 840-6685",
//   },
//   {
//     id: "drsAJ4SHPYqZeG-83QTVW",
//     name: "Kennedy Lane",
//     email: "mattis.Cras@nonenimMauris.net",
//     phone: "(542) 451-7038",
//   },
// ];

router.get("/", async (req, res, next) => {
  const contacts = await contactsOperations.listContacts();
  // res.json({ message: 'template message' })
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
  const { contactId } = req.params;
  const result = await contactsOperations.getContactById(contactId);
  // console.log(result);
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Product with id = ${contactId} not found!`,
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
});

router.post("/", async (req, res, next) => {
  // res.json({ message: "template message" });
  const contacts = await contactsOperations.listContacts();
  const newContact = { ...req.body, id: nanoid() };
  contacts.push(newContact);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
  // const contacts = await contactsOperations.listContacts();
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
