const Auction = require('../data/db').Auction;
const AuctionBid = require('../data/db').AuctionBid
const Customer = require("../data/db").Customer;


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
            if(auction.minimumPrice > price) {errorCb(err); }       
        })
		AuctionBid.find({ auctionId: auctionId}, function(err, auctionbids){
            console.log(auctionbids[auctionbids.length-1]);  
            if(auctionbids[auctionbids.length-1].price > price) {errorCb(err); }  
        });
        Customer.findById(customerId, function(err, customer){
            console.log(customer)  
            if(err) {errorCb(err); }  
        })
        auctionbid = {
            "auctionId" : auctionId,
            "customerId" : customerId,
            "price" : price
        }
        Auction.findByIdAndUpdate(auctionId, function(err, auction){
            auction.auctionWinner = customerId;
        })
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
