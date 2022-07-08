const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return contacts = JSON.parse(data);
};

const getContactByld = async (id) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
    if (!result) {
        return null
    }

    return result;
};

const removeContact = async (id) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) {
        return null;
    }

    const [removeContactID] = contacts.splice(idx, 1);
    updateContacts(contacts);
    return removeContactID;
};

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        name,
        email,
        phone,
        id: nanoid(),
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

module.exports = {
    listContacts,
    getContactByld,
    updateContacts,
    removeContact,
    addContact,


}