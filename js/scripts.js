// Business Logic for AddressBook ---------
function AddressBook() {
    this.contacts = {};
    this.currentId = 0;
}

AddressBook.prototype.addContact = function (contact) {
    contact.id = this.assignId();
    this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function () {
    this.currentId += 1;
    return this.currentId;
};

AddressBook.prototype.findContact = function (id) {
    if (this.contacts[id] != undefined) {
        return this.contacts[id];
    }
    return false;
};

AddressBook.prototype.deleteContact = function (id) {
    if (this.contacts[id] === undefined) {
        return false;
    }
    delete this.contacts[id];
    return true;
};


// Business Logic for Contacts ---------

function Contact(firstName, lastName, phoneNumber, emailAddress, physicalAddress) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.emailAddress = emailAddress;
    this.physicalAddress = physicalAddress;
}

Contact.prototype.fullName = function () {
    return this.firstName + " " + this.lastName;
};


Contact.prototype.fullName = function () {
    return this.firstName + " " + this.lastName;
};

function showContact(contactId) {
    const contact = addressBook.findContact(contactId);
    $("#show-contact").show();
    $(".first-name").html(contact.firstName);
    $(".last-name").html(contact.lastName);
    $(".phone-number").html(contact.phoneNumber);
    $(".email-address").html(contact.emailAddress);
    $(".physical-address").html(contact.physicalAddress);
    let buttons = $("#buttons");
    buttons.empty();
    buttons.append("<button class='deleteButton btn btn-danger' id=" + + contact.id + "><b>Delete</b></button>");
}

function attachContactListeners() {
    $("ul#contacts").on("click", "li", function () {
        showContact(this.id);
    });


    $("#buttons").on("click", ".deleteButton", function () {
        addressBook.deleteContact(this.id);
        $("#show-contact").hide();
        $("#frt").hide();
        displayContactDetails(addressBook);
    });

}


// User Interface Logic ---------

let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
    let contactsList = $("ul#contacts");
    let htmlForContactInfo = "";
    Object.keys(addressBookToDisplay.contacts).forEach(function (key) {
        const contact = addressBookToDisplay.findContact(key);
        htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName.toUpperCase() + " " + contact.lastName.toUpperCase() + "</li>";
    });
    contactsList.html(htmlForContactInfo);
};



$(document).ready(function () {
    $("form#pageOne").submit(function (event) {
        event.preventDefault();

        $("#gun").click(function () {
            $("#new-contact").show()
            $("#pageOne").hide()
        })

    })
})

$(document).ready(function () {
    attachContactListeners()
    $("form#new-contact").submit(function (event) {
        event.preventDefault();
        const inputtedFirstName = $("input#new-first-name").val();
        const inputtedLastName = $("input#new-last-name").val();
        const inputtedPhoneNumber = $("input#new-phone-number").val();
        const inputtedEmailAddress = $("input#new-email-address").val();
        const inputtedPhysicalAddress = $("input#new-physical-address").val();


        // The next three lines are new:
        $("input#new-first-name").val("");
        $("input#new-last-name").val("");
        $("input#new-phone-number").val("");
        $("input#new-email-address").val("");
        $("input#new-physical-address").val("");



        let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedPhysicalAddress);
        addressBook.addContact(newContact);
        let myContact = displayContactDetails(addressBook)
        $("#contacts").html(myContact)
    });

    $("#xaq").click(function () {
        $("#contact-book").show()
        $("#new-contact").hide()
    })

    $("#added").click(function () {
        $("#contact-book").hide()
        $("#new-contact").show()
    })
});
