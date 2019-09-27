const Art = require("../data/db").Art;

const artService = () => {
    const getAllArts = (cb, errorCb) => {
        Art.find({ }, function(err, arts){
            if (err) { errorCb(err);}
            cb(arts)
        });
    };

    const getArtById = (id, cb, errorCb) => {
        Art.findById(id, function(err, art){
            if (err) { errorCb(err);}
            cb(art)
        })
    };

    const createArt = (art, cb, errorCb) => {
        Art.create(art, function(err,result){
            if(err){errorCb(err);}
            else {(cb(result));}
        });
    };

    return {
        getAllArts,
        getArtById,
        createArt
    };
};

module.exports = artService();
