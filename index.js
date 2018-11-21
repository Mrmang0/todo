function toDoNote(name, description,removeFunction,date) {
    var self = this;
    self.name = ko.observable(name);
    self.description = ko.observable(description);
    let oldValues = updateValues();
    self.date = ko.observable(date === undefined?updateDate(new Date()) :date);
    self.isVisible = ko.observable(false);

    self.changeMode = function () {
        self.isVisible(!self.isVisible());
        if (!self.isVisible()) {
            self.name(oldValues.name);
            self.description(oldValues.description);
        }
    }

    self.editNote = function () {
        oldValues = updateValues();
        self.isVisible(!self.isVisible());
        self.date("edited: " + updateDate(new Date()))
    }

    self.deleteNote = function () {
        removeFunction(this);
    }

    function updateValues() {
        return {
            name: self.name(),
            description: self.description()
        }
    }

    function updateDate(sDate) {
        return sDate.getHours() + ':' +
            sDate.getMinutes() + " " + sDate.getDate() + '.' + sDate.getMonth() + '.' + sDate.getFullYear();
    }

}


function toDoViewModel() {
    var self = this;
    self.name = ko.observable("");
    self.description = ko.observable("");

    self.displayNoteForm = ko.observable(false);
    self.displayError = ko.observable(false);

    self.deleteNote = function (note) {
        self.notes.splice(self.notes.indexOf(note), 1);
        saveNotesList();
    }


    self.notes =ko.observableArray([
        new toDoNote("first", "just nothing",self.deleteNote),
        new toDoNote("second", "heh",self.deleteNote)
    ]);


    

    self.addNewNote = function () {
        if (!self.displayNoteForm()) {
            self.displayNoteForm(!self.displayNoteForm());
        } else {
            if (self.name() === "" || self.description() === "") {
                self.displayError(true);
                return;
            }
            
            self.notes.push(new toDoNote(self.name(), self.description()
            ,self.deleteNote));
            self.displayNoteForm(!self.displayNoteForm())
            self.name("");
            self.description("");
            self.displayError(false);
            saveNotesList();
        }
    }

    self.changeMode = function () {
        self.displayNoteForm(!self.displayNoteForm());
    }

    function isExist(){
        localStorage.getItem('notes');
    }

    function saveNotesList()
    {
        const notesList =[];
        self.notes().forEach(element => {
            notesList.push({
                name: element.name(),
                description: element.description(),
                date: element.date()
            })
        });
        console.log("closed");
        localStorage.setItem('notes',JSON.stringify(notesList));    
    }

    function getNotesList()
    {
        const notesList =JSON.parse(localStorage.getItem('notes'));
        const noteFuncList  = [];
        notesList.forEach(element => {
            noteFuncList.push(new toDoNote(element.name,element.description,
                self.deleteNote,element.date))
        });
        return noteFuncList;
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