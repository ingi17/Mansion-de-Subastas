const Customer = require("../data/db").Customer;
const AuctionBit = require('../data/db').AuctionBid;
const customerService = () => {
    const getAllCustomers = (cb, errorCb) => {
        Customer.find({ }, function(err, customer){
            if (err) { errorCb(err);}
            cb(customer)
        });
    };

    const getCustomerById = (id, cb, errorCb) => {
        Customer.findById(id, function(err, customer){
            if (err) { errorCb(err);}
            cb(customer)
        })
    };

    const getCustomerAuctionBids = (custId, cb, errorCb) => {
        AuctionBit.find({customerId : custId},function(err, customer){
            if (err) { errorCb(err);}
            if (errorCb) { console.log(1);}
            cb(customer)
        });
    };

	const createCustomer = (customer, cb, errorCb) => {
        Customer.create(customer, function(err,result){
            if(err){errorCb(err);}
            else {(cb(result));}
        });
    };
    
    return {
        getAllCustomers,
        getCustomerById,
        getCustomerAuctionBids,
		createCustomer
    };
};

module.exports = customerService();

//name : 'maggi',
//username : 'maximo',
//email : 'maggi netti',
//address :'toffarahus1'
