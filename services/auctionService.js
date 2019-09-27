const Auction = require('../data/db').Auction;
const AuctionBid = require('../data/db').AuctionBid
const Customer = require("../data/db").Customer;
const bodyParser = require('body-parser');


const auctionService = () => {
    const getAllAuctions = (cb, errorCb) => {
        Auction.find({ }, function(err, auctions){
            if (err) { errorCb(err);}
            cb(auctions)
        });
    };

    const getAuctionById = (id, cb, errorCb) => {
        Auction.findById(id, function(err, auction){
            if (err) { errorCb(err);}
            cb(auction)
        })
    };

    const getAuctionWinner = (auctionId, cb, errorCb) => {
        console.log(auctionId)
        Auction.findById(auctionId, function(err, auction){
            if(auction.auctionWinner == null) {cb('This auction had no bids')}
            Customer.findById(auction.auctionWinner, function(err, customer){
                cb(customer)
            })
            

        })
    };

	const createAuction = (auction, cb, errorCb) => {
        Auction.create(auction, function(err,result){
            if(err){errorCb(err);}
            else {(cb(result));}
        });
    };

	const getAuctionBidsWithinAuction = (auctionId, cb, errorCb) => {
        AuctionBid.find({ auctionId: auctionId}, function(err, auctionbids){
            if (err) { errorCb(err);}
            cb(auctionbids)    
        });
    };
	const placeNewBid = (auctionId, customerId, price, cb, errorCb) => {

        Auction.findById(auctionId, function(err, auction){
            console.log(auction.minimumPrice)
            console.log(price)
            if(auction.minimumPrice > price) {errorCb(err); return;}       
        })
		AuctionBid.find({ auctionId: auctionId}, function(err, auctionbids){
            console.log(auctionbids)  
            if(auctionbids > price) {errorCb(err); return;}  
        });
        auctionbid = {
            "auctionId" : auctionId,
            "customerId" : customerId,
            "price" : price
        }
        AuctionBid.create(auctionbid, function(err,result){
            if(err){errorCb(err);}
            else {(cb(result));}
        });
	}

    return {
        getAllAuctions,
        getAuctionById,
        getAuctionWinner,
		createAuction,
		getAuctionBidsWithinAuction,
		placeNewBid
    };
};

module.exports = auctionService();
