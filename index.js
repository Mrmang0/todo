function toDoNote(name, description) {
    var self = this;
    self.name = name;
    self.description = description;
}

// Overall viewmodel for this screen, along with initial state
function toDoViewModel() {
    var self = this;
    self.name = ko.observable("wow its a name");
    self.description = ko.observable("wow its a description");
    // Non-editable catalog data - would come from the server

    self.log = function () {
        console.log()
    }

    // Editable data
    self.toDos = ko.observableArray([
        new toDoNote("Steve", "brow"),
        new toDoNote("Bert", "seat")
    ]);

    self.addNewNote = function () {
        self.toDos.push(new toDoNote(self.name, self.description))
    }

    self.displayNotes = ko.observable(true);

    self.hideButtonName = ko.observable(self.displayNotes ? "Hide notes" : "Show notes")
    self.hideNotes = function () {
        self.displayNotes(!self.displayNotes());
        self.hideButtonName(self.displayNotes() ? "Hide notes" : "Show notes")
        console.log(self.displayNotes());
        console.log(self.hideButtonName());
        
    }
}

ko.bindingHandlers.fadeVisible = {
    init: function (element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        $(element).toggle(ko.unwrap(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
    },
    update: function (element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();
        ko.unwrap(value) ? $(element).fadeIn() : $(element).fadeOut();
    }
};

ko.applyBindings(new toDoViewModel());