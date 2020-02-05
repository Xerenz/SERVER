const Event = require("../models/event.model");

// test case
exports.test = function(req, res) {
    res.send("This route is working");
}

// view all events belonging to that branch
exports.view_event = function(req, res) {
    Event.find({branch : req.params.branch}, function(err, events) {
        // res.send(events);
        console.log(events)
        res.render("viewEvent", {events : events});
    });
};

// prefill the form to edit events
exports.delete_event = function(req, res) {
    Event.findByIdAndDelete(req.params.id, function(err, event) {
        // res.send(event);
        res.redirect("/volunteer/event/"+ req.params.branch + "/view")
    });
};



// prefill the form to edit events
exports.edit_event = function(req, res) {
    Event.findById(req.params.id, function(err, event) {
        // res.send(event);
        res.render("editEvent", {event : event});
    });
};

// form to add events
exports.add_event = function(req, res) {
    // res.send("add events here");
    branch = req.params.branch
    res.render("addEvent", { "branch" : branch });
};

// add new event
exports.post_add = function(req, res) {

    let contact1 = {name : req.body.contact1, phone : req.body.phone1}
    let contact2 = {name : req.body.contact2, phone : req.body.phone2}

    console.log(req.body.branch)

   event  = new Event( 
        {
            name : req.body.name,
            branch : req.body.branch,
            label : req.body.label,
            content : req.body.content,
            date : req.body.date,
            fees : req.body.fees,
            price1 : req.body.price1,
            price2 : req.body.price2,
            price3 : req.body.price3,
            branch: req.body.branch,
            contact : [contact1, contact2],
            
            message : req.body.message,
            isOpen : true,

            details : req.body.details,
            pdfUrl : req.body.pdfUrl,
        });

    console.log(event)

    event.save(function(err,data) {
        if (err) return console.log(err);
        else 
            {   

                res.redirect('view');
            }
    });
};

exports.post_edit = function(req, res) {
    let contact1 = {name : req.body.contact1, phone : req.body.phone1}
    let contact2 = {name : req.body.contact2, phone : req.body.phone2}

    // perform updating
    Event.findByIdAndUpdate(req.params.id, {
        name : req.body.name,
        label : req.body.label,
        content : req.body.content,
        date : req.body.date,
        fees : req.body.fees,
        price1 : req.body.price1,
        price2 : req.body.price2,
        price3 : req.body.price3,

        contact : [contact1, contact2],
        
        message : req.body.message,
        isOpen  : req.body.isOpen,
        details : req.body.details,
        pdfUrl  :req.body.pdfUrl,
        url     :req.body.url

    }, function(err, event) {
        if (err) return console.log(err);
        else 
            {   

                res.redirect('/volunteer/event/'+event.branch + '/view');
            }
    });    
};
