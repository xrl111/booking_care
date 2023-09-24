const db = require('../models');

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter',
                });
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    image: data.imageBase64,
                });

                resolve({
                    errCode: 0,
                    errMessage: 'Success',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createClinic: createClinic,
};
