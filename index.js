function toDoNote(name, description) {
    var self = this;
    self.name = ko.observable(name);
    self.description = ko.observable(description);
    let tDate = new Date();
    self.date = ko.observable(tDate.getHours() + ':' + tDate.getMinutes() + " " + tDate.getDate() + '.' + tDate.getMonth() + '.' + tDate.getFullYear());
    self.isVisible = ko.observable(false);
    self.changeMode = function () {
        self.isVisible(!self.isVisible());
    }
    self.deleteNote =function(root){
    console.log(    root.indexOf(self));
    }
}


function toDoViewModel() {
    var self = this;
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.displayNoteForm = ko.observable(false);


    // Editable data
    self.toDos = ko.observableArray([
        new toDoNote("first", "just nothing"),
        new toDoNote("second", "still nothing",self)
    ]);

    self.addNewNote = function () {

        if (!self.displayNoteForm()) {
            console.log(self.displayNoteForm())
            self.displayNoteForm(!self.displayNoteForm());
        } else {
            self.toDos.push(new toDoNote(self.name(), self.description()));
            self.displayNoteForm(!self.displayNoteForm())
            self.name("");
            self.description("");

        }

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