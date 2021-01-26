const Exhibition = require("../models/exhibition.model");
const Workshop = require("../models/ws.model");
const Event = require("../models/event.model");

// Controller for all view requests

exports.admin_panel = function(req, res) {
    res.render("admin/admin");
};

exports.view_workshop = function(req, res) {
    Workshop.find({branch : req.params.branch}, function(err, workshops) {
        res.render("admin/viewWorkshop", {events : workshops});
    });
};

exports.view_events = function(req, res) {
    Event.find({branch : req.params.branch}, function(err, events) {
        res.render("admin/viewEvent", {events : events});
    });
};

exports.view_exhibition = function(req, res) {
    Exhibition.find({branch : req.body.branch}, function(err, exhibits) {
        res.render("admin/viewExhibition", {events : exhibits});
    });
};

// addition of workshops, exhibitions, events
exports.add_workshop = function(req, res) {
    res.render("admin/addWorkshop", {branch : req.params.branch});
};

exports.add_events = function(req, res) {
    res.render("admin/addEvents", {branch : req.params.branch});
};

exports.add_exhibitions = function(req, res) {
    res.render("admin/addExhibition", {branch : req.params.branch});
};

// deleting
exports.delete_workshop = function(req, res) {
    Event.findByIdAndDelete(req.params.id, function(err, event) {
        res.rendirect("/SantyDance/event/"+req.params.id+"/view");
    });
};

exports.delete_exhibition = function(req, res) {
    Exhibition.findByIdAndDelete(req.params.id, function(err, event) {
        res.rendirect("/SantyDance/exhibition/"+req.params.id+"/view");
    });
};

exports.delete_event = function(req, res) {
    Workshop.findByIdAndDelete(req.params.id, function(err, event) {
        res.rendirect("/SantyDance/workshop/"+req.params.id+"/view");
    });
};

// Controller for creating workshops

exports.create_workshop = function(req, res) {

    let contact1 = {
        name : req.body.contact1,
        phone : req.body.phone1
    }
    
    let contact2 = {
        name : req.body.contact2,
        phone : req.body.phone2
    }

    let workshop = new Workshop({
        name : req.body.name,
        branch : req.body.branch,
        price : req.body.price,
        date : req.body.date,
        content : req.body.content,

        contact : [contact1, contact2],

        message : req.body.message,
        isOpen : true,
        details : req.body.details,
        pdfUrl : req.body.pdf,
        url : req.body.url
    }); 

    console.log(workshop);

    workshop.save(function(err,data) {
        if (err) return console.log(err);
        else 
            {   
                res.redirect('view');
            }
    });
};

exports.create_event = function(req, res) {

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

exports.create_exhibition = function(req, res) {

    let contact1 = {
        name : req.body.contact1,
        phone : req.body.phone1
    }
    
    let contact2 = {
        name : req.body.contact2,
        phone : req.body.phone2
    }

    let exhibition = new Exhibition({
        name : req.body.name,
        branch : req.body.branch,
        price : req.body.price,
        date : req.body.date,
        content : req.body.content,

        contact : [contact1, contact2],

        message : req.body.message,
        isOpen : true,
        details : req.body.details,
        pdfUrl : req.body.pdf,
        url : req.body.url
    }); 

    console.log(workshop);

    exhibition.save(function(err,data) {
        if (err) return console.log(err);
        else 
            {   
                res.redirect('view');
            }
    });
};


// updating 

exports.update_workshop = function(req, res) {
    let contact1 = {name : req.body.contact1, phone : req.body.phone1}
    let contact2 = {name : req.body.contact2, phone : req.body.phone2}

    // perform updating
    Workshop.findByIdAndUpdate(req.params.id, {
        name : req.body.name,
        label : req.body.label,
        content : req.body.content,
        date : req.body.date,
        price : req.body.fees,

        contact : [contact1, contact2],
        
        message : req.body.message,

        details : req.body.details,
        pdfUrl : req.body.pdfUrl,

    }, function(err, event) {
        if (err) return console.log(err);
        else 
            {   
                res.redirect('/SantyDance/workshop/'+event.branch + '/view');
            }
    });    
};

exports.update_event = function(req, res) {
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

        details : req.body.details,
        pdfUrl : req.body.pdfUrl,

    }, function(err, event) {
        if (err) return console.log(err);
        else 
            {   
                res.redirect('/SantyDance/event/'+event.branch + '/view');
            }
    });    
};

exports.update_exhibition = function(req, res) {
    let contact1 = {name : req.body.contact1, phone : req.body.phone1}
    let contact2 = {name : req.body.contact2, phone : req.body.phone2}

    // perform updating
    Event.findByIdAndUpdate(req.params.id, {
        name : req.body.name,
        label : req.body.label,
        content : req.body.content,
        date : req.body.date,
        price : req.body.fees,

        contact : [contact1, contact2],
        
        message : req.body.message,

        details : req.body.details,
        pdfUrl : req.body.pdfUrl,

    }, function(err, event) {
        if (err) return console.log(err);
        else 
            {   
                res.redirect('/SantyDance/exhibition/'+event.branch + '/view');
            }
    });    
};

