const CrudRepository = require("./crud-repositories");
const { Flight, Airport , Airplane, sequelize, Sequelize , City} = require("../models");
const {Op}  = Sequelize

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter,sort) {
        try {
            console.log("sort array : " ,sort) ;
            const flights = await this.model.findAll({
                where: filter,
                order : sort,
               include: [{ 
                model: Airplane,
                // 
                as:'airplaneDetail'
                // since this association is by default on the primary key of the airplane table so no need to 
                // explicitoly tell them about the column matching 
               },
            {
                model: Airport ,
                 as: 'departureAirportDetail',
                 // but here flights don't refer to the primary key (id) of the airport but to the code so we need to
                 // explicitly tell them about it
                 on: {
                [Sequelize.Op.and]: [
                    Sequelize.where(
                        Sequelize.col("Flight.departureAirportId"),
                        Op.eq,
                        Sequelize.col("departureAirportDetail.code")
                    )
                ],
                
            },
            include:{
                    model: City,
                    as : 'cityDetails'
                }
        },
            {
                model: Airport ,
                 as: 'arrivalAirportDetail',
                 on: {
                [Sequelize.Op.and]: [
                    Sequelize.where(
                        Sequelize.col("Flight.arrivalAirportId"),
                        Op.eq,
                        Sequelize.col("arrivalAirportDetail.code")
                    )
                ]
            }
            ,
            include:{
                    model: City,
                    as : 'cityDetails'
                }
            }]
            });
           console.log(" flights : ", flights) ;
            return flights;
        } catch (error) {
            console.error("Error fetching flights:", error);
            throw error;
        }
    }
}

module.exports = FlightRepository;
