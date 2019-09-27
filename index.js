const artService = require("./services/artService");
const artistService = require("./services/artistService");
const auctionService = require("./services/auctionService");
const customerService = require("./services/customerService");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/api/arts', function(req, res){
    artService.getAllArts(function(arts){
        return res.json(arts);
    }, function(err){
        return res.status(404).json(err);
    });
});
app.get('/api/arts/:id', function(req,res){
    const artsId = req.params.id;
    artService.getArtById(artsId, function(art){
        return res.json(art)
    }, function(err){
        return res.status(404).json(err);
    });
});
app.post('/api/arts', function(req, res){
    console.log(req.body)
    artService.createArt(req.body, function(art){
        return res.status(201).json(art);
    },  function(err){
        return res.status(400).json(err);
    })
});

app.get('/api/artists', function(req, res){
    artistService.getAllArtists(function(artists){
        return res.json(artists);
    }, function(err){
        return res.status(404).json(err);
    });
});
app.get('/api/artists/:id', function(req,res){
    const artistId = req.params.id;
    artistService.getArtistById(artistId, function(artist){
        return res.json(artist);
    }, function(err){
        return res.status(404).json(err);
    });
});
app.post('/api/artists', function(req, res){
    console.log(req.body)
    artistService.createArtist(req.body, function(art){
        return res.status(201).json(art);
    },  function(err){
        return res.status(400).json(err);
    })
});
app.get('/api/customers', function(req, res){
    customerService.getAllCustomers(function(customers){
        return res.json(customers);
    }, function(err){
        return res.status(404).json(err);
    });
});
app.get('/api/customers/:id', function(req,res){
    const customerId = req.params.id;
    customerService.getCustomerById(customerId, function(customer){
        return res.json(customer)
    }, function(err){
        return res.status(404).json(err);
    });
});
app.post('/api/customers', function(req, res){
    console.log(req.body)
    customerService.createCustomer(req.body, function(art){
        return res.status(201).json(art);
    },  function(err){
        return res.status(400).json(err);
    })
});
app.get('/api/customers/:id/auction-bids', function(req,res){
    const customerId = req.params.id;
    customerService.getCustomerAuctionBids(customerId,function(customer){
        return res.status(200).json(customer)
    },function(err){
        return res.status(400).json(err)
    });
});
app.get('/api/auctions', function(req, res){
    auctionService.getAllAuctions(function(auctions){
        return res.json(auctions);
    }, function(err){
        return res.status(404).json(err);
    });
});
app.get('/api/auctions/:id', function(req,res){
    const auctionId = req.params.id;
    auctionService.getAuctionById(auctionId, function(auction){
        return res.json(auction)
    }, function(err){
        return res.status(404).json(err);
    });
});
app.get('/api/auctions/:id/winner', function(req,res){
    const auctionId = req.params.id;
    auctionService.getAuctionWinner(auctionId,function(auction){
        console.log(auctionId)
        if(auction == "") return res.status(200).json("this auction has no bids")
        return res.status(200).json(auction)
    },function(err){
        return res.status(400).json(err)
    });
});
app.post('/api/auctions', function(req, res){
    auctionService.createAuction(req.body, function(auction){
        return res.status(201).json(auction);
    },  function(err){
        return res.status(400).json(err);
    })
});
app.get('/api/auctions/:id/bids', function(req,res){
    const auctionId = req.params.id;
    auctionService.getAuctionBidsWithinAuction(auctionId, function(bids){
        return res.json(bids)
    }, function(err){
        return res.status(404).json(err);
    });
});
app.post('/api/auctions/:id/bids', function(req, res){
    const auctionId = req.params.id;
    const customerId = req.body.customerId;
    const price = req.body.price;
    auctionService.placeNewBid(auctionId,customerId,price, function(auctionbid){
        return res.status(201).json(auctionbid);
    },  function(err){
        return res.status(400).json(err);
    })
});
app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});
