const { Flights } = require("../models/Flight");
//calling package that handles the flight ids
const { v4: uuid } = require("uuid");

   //Booking a flight
   exports.bookFlight = async (req, res) => {
    try {
       const {title, time, price, date} = await req.body;
       const bookFlight = {
        id: uuid(),
        title: title,
        time: time,
        price: price,
        date: date
       };
       Flights.push(bookFlight);
       res.status(201).json({
        message: "Flight successfully booked. Check details below and proceed to payment",
        bookFlight,
       });
    } catch (error) {
        res.status(500).json({ message: err.message});
        
    }

};



//Logic to get all flights
exports.getAllFlights = async(req, res) => {
 try {
    const allFlights = Flights;
    res.status(200).json({
        message: "Here is a list of available flights",
        flights: allFlights,
    });
 } catch(err) {
    res.status(500).json({ message: err });
 }


};


// to get a single flight usingid                                                                                                          
exports.getSingleFlight = async (req, res) => {
    try {
        let id = req.params.id;
        const singleFlight = Flights.find((singleFlight) => singleFlight.id === id);
        res.status(200).json({
            message: "Flight found, check out details below:",
            singleFlight,

        });
        
    } catch (error) {
        
    };


 
};

// to edit flight booking details

exports.editFlight = async (req, res) => {
     try {
        let id = req.params.id;
        const flight = Flights.find((flight) => flight.id === id);
        const {title, time, price, date} = await req.body;
        flight.title = title;
        flight.time = time;
        flight.price = price;
        flight.date = date;
        res.status(200).json({
            message: "Booking details updated",
            flight,
        });
        
     } catch (error) {
      res.status(500).json({ message: err.message });
     }
};

// to edit flight booking details

exports.deleteFlight = async (req, res) => {
    try {
       let id = req.params.id;
       const flight = Flights.find((flight) => flight.id === id);
       Flights.splice(Flights.indexOf(flight), 1);
       res.status(200).json({
           message: "Flight Deleted",
           flight,
       });
       
    } catch (error) {
     res.status(500).json({ message: err.message });
    }
};