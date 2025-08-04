const CrudRepository = require("./crud-repositories");
const {Airport} = require("../models") ;
/*
 Now just extend that general crud-repository class
 import you model and call the parents' constructor with that model
*/
class AirportRepository extends CrudRepository{
    constructor(){
        super(Airport) ;
    }
    // basic function can be called from parent and other raw queries can also be defined in here
}
module.exports = AirportRepository ;