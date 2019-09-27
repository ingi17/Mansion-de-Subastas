const Auction = require('../data/db').Auction;
const AuctionBid = require('../data/db').AuctionBid
const Art = require('../data/db').Art;
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
        Auction.findById(auctionId, function(err, auction){
            if (auction.endDate > new Date) { errorCb("409 Conflict");}
            else if(auction.auctionWinner == null) {cb('This auction had no bids')}
            else if (err) {errorCb(err)}
            else {
                Customer.findById(auction.auctionWinner, function(err, customer){
                    cb(customer)
                })
            }
            

        })
    };

	const createAuction = (auction, cb, errorCb) => {
        Auction.find({artId : auction.artId}, (err, art) => {
            if(art.length != 0){ errorCb("409 Conflict"); }
            else{
                Art.findById(auction.artId, function(err, art){
                    if (art.isAuctionItem == false) { errorCb("412 Precondition Failed"); }
                    else { 
                        Auction.create(auction, function(err,result){ cb(result); })
                    };
                })
            }
            
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
            if (auction.minimumPrice > price) { errorCb("412 Precondition Failed");}
            else if (auction.endDate < new Date) { errorCb("403 Forbidden");}
            else { // nested spaghetti code (puke)
                AuctionBid.find({ auctionId: auctionId}, function(err, auctionbids){
                        if(auctionbids.length > 0 && auctionbids[auctionbids.length-1].price >= price) { errorCb("412 Precondition Failed");}  
                        else {
                            Customer.findById(customerId, function(err, customer){
                                if(err) {errorCb("404 Customer Not Found"); } 
                                else {
                                    Auction.findById(auctionId).updateOne({auctionWinner: customerId}, function(err, auction) {});
                                    auctionbid =  {
                                        "auctionId" : auctionId,
                                        "customerId" : customerId,
                                        "price" : price
                                    }   
                                
                                    AuctionBid.create(auctionbid, function(err,result){
                                        if(err){errorCb(err);}
                                        else {(cb(result));}
                                    });
                                }
                            })
                        }
                    
                });
            }
        })
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
