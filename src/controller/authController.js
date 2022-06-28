const authorModel = require('../model/authorModel')


const isValidtitle = (title) => {
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1

}

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === Number && value.trim().length === 0) return false
    return true
}

/////---------------------------------------------------------createAuthor---------------------------------------------------------------------


const createAuthor = async function (req, res) {
    
    try {

        let data = req.body
        let emailGet=data.email

        if (!Object.keys(data).length) { return res.status(400).send({ status: false, msg: "You must enter data." }) }


        /******************************* validation of author *******************************/

        if (!isValid(data.fname)) { return res.status(400).send({ status: false, msg: "fname is mandatory" }) }

        if (!(/^[a-zA-Z]+$/.test(data.fname.trim()))) { return res.status(400).send({ status: false, msg: "Enter a valid First name." }) }

        if (!data.lname) { return res.status(400).send({ status: false, msg: "lname is mandatory" }) }

        if (!(/^[a-zA-Z]+$/.test(data.lname.trim()))) { return res.status(400).send({ status: false, msg: "Enter a valid Last name." }) }

        if (!emailGet) { return res.status(400).send({ status: false, msg: "email is mandatory" }) }

        
        if (!data.title) { return res.status(400).send({ status: false, msg: "title is mandatory" }) }

        if (!isValidtitle(data.title)) { return res.status(400).send({ status: false, msg: 'Enter valid enum  ["Mr", "Mrs", "Miss"]' }) }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailGet.trim()))) { return res.status(400).send({ status: false, msg: "Enter a valid email address." }) }

        let validEmail = await authorModel.findOne({ email: emailGet })
       
        if (validEmail) return res.status(400).send({ status: false, msg: "email Already  exist "})

        if (!isValid(data.pasword)) { return res.status(400).send({ status: false, msg: "password is mandatory" }) }


        let created = await authorModel.create(data)
    
        res.status(201).send({ status: true, data: created })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, msg: err.message })
    }

}

module.exports.createAuthor = createAuthor