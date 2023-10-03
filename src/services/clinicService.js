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
                if (data.action === 'ADD') {
                    await db.Clinic.create({
                        name: data.name,
                        address: data.address,
                        descriptionHTML: data.descriptionHTML,
                        descriptionMarkdown: data.descriptionMarkdown,
                        image: data.imageBase64,
                    });
                } else {
                    if (data.action === 'EDIT') {
                        let clinic = await db.Clinic.findOne({
                            where: { id: data.clinicId },
                            raw: false,
                        });
                        if (clinic) {
                            clinic.name = data.name;
                            clinic.address = data.address;
                            clinic.descriptionHTML = data.descriptionHTML;
                            clinic.descriptionMarkdown = data.descriptionMarkdown;
                            clinic.image = data.imageBase64;
                            await clinic.save();
                        }
                    }
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Success',
                    data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if (data && data.length > 0) {
                data.map((item) => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                });
            }
            resolve({
                errCode: 0,
                errMessage: 'ok',
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter',
                });
            } else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown'],
                });
                if (data) {
                    let doctorClinic = [];
                    doctorClinic = await db.Doctor_Info.findAll({
                        where: {
                            clinicId: inputId,
                        },
                        attributes: ['doctorId', 'provinceId'],
                    });
                    data.doctorClinic = doctorClinic;
                } else data = {};
                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createClinic: createClinic,
    getDetailClinicById: getDetailClinicById,
    getAllClinic: getAllClinic,
};
