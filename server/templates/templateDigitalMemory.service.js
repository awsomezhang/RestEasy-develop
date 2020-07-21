const fs = require("fs")

module.exports = {
    saveTemplate,
    getTemplate,
    getResetTemplate,
};

async function saveTemplate(body){
    console.log("Request: change template")

    let error;
    let status;

    try {
        //console.log(req.body["layout"][0]["items"][0]);
        fs.writeFile(
            '../src/views/TemplateDigitalMemory/layout.js',
            "export default" + JSON.stringify(body["layout"]),
            function(err){
                if (err) throw err;
                console.log("Template changed!")
            }
        );
    } catch (error) {
        console.error("Error: ", error);
        status = "failure";
    }

    return({error, status})
}

async function getTemplate(){
    console.log("Request: get template")

    return await JSON.parse(fs.readFileSync(
        '../src/views/TemplateDigitalMemory/layout.js',
        "utf8",
    ).substring(14))

}

async function getResetTemplate(){
    console.log("Request: get template")

    let error
    let status

    try{
        fs.readFile(
            '../src/views/TemplateDigitalMemory/layout_backup2.js',
            "utf8",
            function read(err, data){
                if (err) throw err;
                console.log("Template read!")
                return(data.substr(14))
            }
        );
    }
    catch (error) {
        console.error("Error: ", error);
    }

}
