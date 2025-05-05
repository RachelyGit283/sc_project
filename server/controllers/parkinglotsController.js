const Parkinglots = require("../models/Parkinglots");
const Users = require("../models/Users");
// creat1
const createNewParkinglots = async (req, res) => {
    const { _id } = req.user
    const user = await Users.findById(_id, { passwordUser: 0 }).lean()
    if (!user) {
            return res.status(400).json({ message: 'No user' })
    }
    if(user.rolesUser!="managerParkinglot")
        {            return res.status(400).json({ message: 'No rolse' })
}
    const { nameParkinglot, managerParkinglot, country, city, street, numberOfStreet, sizeParkinglot } = req.body
    if (!nameParkinglot || !managerParkinglot || !country || !city || !street || !numberOfStreet || !sizeParkinglot) {
        return res.status(400).json({ message: 'the items are required' })
    }
    // console.log({ nameParkinglot, managerParkinglot, country, city, street, numberOfStreet, sizeParkinglot });

    const manager = await Users.findById(managerParkinglot).lean()
    if (!manager || manager.rolesUser != 'managerParkinglot') {
        return res.status(400).json({ message: 'not managerParkinglot' })

    }

    const parkinglot = await Parkinglots.create({
        nameParkinglot,
        managerParkinglot,
        locationParkinglot: {
            country,
            city,
            street,
            numberOfStreet
        },
        sizeParkinglot
    });
    if (parkinglot) {

        //     const MParkinglots = await ManagerParkinglots.findById(managerParkinglot).lean()
        //     if (!MParkinglots) {
        //         return res.status(400).json({ message: 'No managerParkinglots' })
        //     }
        //     MParkinglots.allParkMParkinglot.push(parkinglot);


        // const parkinglots2 = await Parkinglots.find().lean()
        // if (!parkinglots2?.length) {
        //     return res.status(400).json({ message: 'No parkinglots found' })
        // }
        return res.status(201).json(parkinglot)
    }
    return res.status(400).json({ message: 'Invalid parkinglots' })


}
const getParkinglotsById = async (req, res) => {
    const { _id } = req.params
    try {
        const parkinglots = await Parkinglots.findById(_id).populate("allParkinglot").lean()
        if (!parkinglots) {
            return res.status(400).json({ message: 'No Parkinglots' })
        }
        return res.json(parkinglots)
    } catch (error) {
        return res.json({ message: 'Error geting Parkinglots', error });
    }
}
const getParkinglotsByIdManager = async (req, res) => {
    const { id } = req.params
    try {
        const parkinglots = await Parkinglots.find({ managerParkinglot: id }).lean()
        if (!parkinglots) {
            return res.status(400).json({ message: 'No parkinglots' })
        }
        res.json(parkinglots)
    } catch (error) {
        return res.status(500).json({ message: 'Error geting Parkinglots', error });
    }
}
//read//כל החניונים
const getAllParkinglots = async (req, res) => {
    const parkinglots = await Parkinglots.find().lean()
    if (!parkinglots?.length) {
        return res.status(400).json({ message: 'No Parkinglots found' })
    }
    res.json(parkinglots)
}
//כל החניונים של אדם שמחובר למערכת 
const getParkinglotsByUser = async (req, res) => {
    const { _id } = req.user
    try {
        const Parkinglots2 = await Parkinglots.find({ managerParkinglot: _id }).lean()
        if (!Parkinglots2) {
            return res.status(400).json({ message: 'No Parkinglots' })
        }
        res.json(Parkinglots2)
    } catch (error) {
        return res.status(500).json({ message: 'Error geting Parkinglots', error });
    }
}
//לקבל חניונים לי עיר ומדינה
const getParkinglotsBycountry = async (req, res) => {
    const { country, city } = req.body;
    try {
        const parkingLots = await Parkinglots.find({
            'locationParkinglot.country': country.toLowerCase(),
            'locationParkinglot.city': city.toLowerCase()
        }).lean();
        // 'locationParkinglot': {
        //     country: country.toLowerCase(),
        //     city: city.toLowerCase()
        // }
        if (parkingLots.length === 0) {
            const parkingLots = await Parkinglots.find({
                'locationParkinglot.country': country.toLowerCase()
            }).lean();
            if (parkingLots.length === 0) {
                return res.status(404).json({ message: 'No Parkinglots found in the specified location' });
            }
        }
        res.json(parkingLots);
    } catch (error) {
        return res.status(500).json({ message: 'Error getting Parkinglots', error });
    }
};
// לפי שם כל החניונים של אדם מסויים
// const getFilterParkinglot = async (req, res) => {
//     const { id } = req.params
//     try {
//         const Parkinglots2 = await Parkinglots.find().populate("Users", { nameUser: id }).lean()
//         if (!owner?.length) {
//             return res.status(400).json({ message: 'No Parkinglots found' })
//         }
//         res.json(Parkinglots2)
//     } catch (error) {
//         return res.status(500).json({ message: 'Error geting Parkinglots', error });
//     }
// }


// כל החניות הפניות
const getParkingEmpty = async (req, res) => {
    const { id } = req.params;

    try {
        const parkinglot = await Parkinglots.findById(id).populate({
            path: 'allParkinglot',
            match: {
                isFullParking: false,
            }
        }).exec();

        if (!parkinglot) {
            return res.status(404).json({ message: 'Parking lot not found' });
        }
        const parkingSpaces = parkinglot.allParkinglot;
        return res.json(parkingSpaces);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving parking empty', error });
    }
};

//בגודל חניה מסוים כל החניות הפניות
const getParkingEmptyOnSize = async (req, res) => {
    const { id } = req.params;
    const { Handicapped, size } = req.query;

    try {
        const parkinglot = await Parkinglots.findById(id).populate({
            path: 'allParkinglot',
            match: {
                isFullParking: false,
                sizeParking: size,
                isHandicappedParking: Handicapped
            }
        }).exec();

        if (!parkinglot) {
            return res.status(404).json({ message: 'Parking lot not found' });
        }
        const parkingSpaces = parkinglot.allParkinglot;
        return res.json(parkingSpaces);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving parking empty', error });
    }
};
// מספר מקומות החניה הריקים
const getCParkingEmpty = async (req, res) => {
    const { id } = req.params;
    // try {
    const parkinglot = await Parkinglots.findById(id).populate({
        path: 'allParkinglot',
        match: {
            isFullParking: false
        }
    }).exec();

    if (!parkinglot) {
        return res.status(404).json({ message: 'Parking lot not found' });
    }

    const parkingSpaces = parkinglot.allParkinglot;

    const emptyParkingCount = parkinglot.length;

    return res.json({ emptyParkingCount });
    // } catch (error) {
    //     return res.status(500).json({ message: 'Error retrieving parking empty', error });
    // }
};

//רק חניות שאינן נכה כל החניונים שיש בהם חניות פניות
const getParkingLotEmptyNoHandicapped = async (req, res) => {
    const { Handicapped, size } = req.query;
    try {
        // שליפת כל החניונים עם חניות פנויות
        const parkingLots = await Parkinglots.find().populate({
            path: 'allParkinglot',
            match: {
                isFullParking: false, // רק חניות שאינן מלאות
                isHandicappedParking: Handicapped,
                sizeParking: size
            }
        }).exec();
        // console.log("fgsgsgdfdag",parkingLots[0].allParkinglot,"jhhhhhhhhh",parkingLots[1].allParkinglot),"jhhhhhhhhh",parkingLots[2].allParkinglot;
        // סינון החניונים שבהם יש לפחות חניה פנויה
        const filteredParkingLots = parkingLots.filter(parkinglot => {
            return parkinglot.allParkinglot && parkinglot.allParkinglot.length > 0;
        });
        return res.json(filteredParkingLots);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving parking lots', error });
    }
};
// כל החניונים שיש בהם חניות פניות
const getParkingLotsWithEmptySpaces = async (req, res) => {
    const { size } = req.params;
    try {
        // שליפת כל החניונים עם חניות פנויות
        const parkingLots = await Parkinglots.find().populate({
            path: 'allParkinglot',
            match: {
                isFullParking: false, 
                sizeParking: size

            }
        }).exec();

        // סינון החניונים שבהם יש לפחות חניה פנויה
        const filteredParkingLots = parkingLots.filter(parkinglot => {
            // console.log()
            return parkinglot.allParkinglot && parkinglot.length > 0;
        });
        return res.json(filteredParkingLots);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving parking lots', error });
    }
};
//כל מנהלי החניונים
const getManagersParkinglot = async (req, res) => {
    try {
        const parkinglots = await Parkinglots.find().populate('managerParkinglot', 'nameUser').lean(); // Adjust the fields as necessary
        if (!parkinglots.length) {
            return res.status(404).json({ message: 'No parkinglots found' });
        }
        const managers = [...new Set(parkinglots.map(parkinglot => parkinglot.managerParkinglot))];

        res.status(200).json(managers);
    } catch (error) {
        console.error('Error fetching managers:', error);
        return res.status(500).json({ message: 'Error getting managers', error });
    }
};
//האם החניון מלא
const getIfParkingFull = async (req, res) => {
    const { id } = req.params;
    try {

        const parkinglot = await Parkinglots.findById(id).populate({
            path: 'allParkinglot',
            match: {
                isFullParking: true
            }
        }).exec();
        if (!parkinglot) {
            return res.status(404).json({ message: 'Parking lot not found' });
        }

        const parkingSpaces = parkinglot.allParkinglot;

        const emptyParkingCount = parkingSpaces.length;
        if (emptyParkingCount === parkinglot.sizeParkinglot) { return res.json(true); }
        return res.json(false);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving parking empty', error });
    }
};

//עידכון חניון
const updateParkinglots = async (req, res) => {
    const { id } = req.params
    const { nameParkinglot, managerParkinglot, city, country, street, numberOfStreet, addParking, sizeParkinglot } = req.body
    if (!id) {
        return res.status(400).json({ message: 'field is required' })
    }
    try {
        const parkinglots = await Parkinglots.findById(id).exec()
        if (!parkinglots) {
            return res.status(400).json({ message: 'parkinglots not found' })
        }
        // parkinglots.locationParkinglot.city= {
        //         country?: country.toLowerCase(),
        //         city: city.toLowerCase()
        //     }
        if (numberOfStreet) parkinglots.locationParkinglot.numberOfStreet = numberOfStreet;
        if (country) parkinglots.locationParkinglot.country = country.toLowerCase();
        if (street) parkinglots.locationParkinglot.street = street.toLowerCase();
        if (city) parkinglots.locationParkinglot.city = city.toLowerCase();
        if (nameParkinglot) parkinglots.nameParkinglot = nameParkinglot;
        if (managerParkinglot) parkinglots.managerParkinglot = managerParkinglot;
        if (sizeParkinglot) parkinglots.sizeParkinglot = sizeParkinglot;
        await parkinglots.save()
        return res.status(201).json(parkinglots)
    } catch (error) {
        console.error(`cant updet:`, error);
    }
}



const deleteParkinglot = async (req, res) => {
    const { id } = req.params;

    const parkinglot = await Parkinglots.findById(id).exec();
    if (!parkinglot) {
        return res.status(400).json({ message: 'Parking lot not found' });
    }
    for (const parkingId of parkinglot.allParkinglot) {
        try {
            //קיצור אפשרי mongoose
            await Parkings.findByIdAndDelete(parkingId);
        } catch (error) {
            console.error(`Failed to delete parking with ID ${parkingId}:`, error);
        }
    }
    await parkinglot.deleteOne();
    const remainingParkinglots = await Parkinglots.find().lean();
    if (!remainingParkinglots.length) {
        return res.status(400).json({ message: 'No Parking lots found' });
    }

    res.json(remainingParkinglots);
};
module.exports = {
    getParkingEmpty,
    getCParkingEmpty,
    deleteParkinglot,
    createNewParkinglots,
    updateParkinglots,
    getParkinglotsById,
    getIfParkingFull,
    getAllParkinglots,
    getParkinglotsByUser,
    getParkinglotsBycountry,
    getParkingLotEmptyNoHandicapped,
    // getFilterParkinglot,
    getManagersParkinglot,
    getParkinglotsByIdManager,
    getParkingLotsWithEmptySpaces,
    getParkingEmptyOnSize
}