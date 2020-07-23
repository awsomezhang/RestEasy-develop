const fs = require("fs")

module.exports = {
    saveTemplate,
    getTemplate,
    getResetTemplate,
};

async function saveTemplate(body){
    console.log("Request: change template")

    return await fs.writeFileSync(
        '../src/views/TemplateDigitalMemory/layout.js',
        "export default" + JSON.stringify(body["layout"]),
    )
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

    return await JSON.parse(fs.readFileSync(
        '../src/views/TemplateDigitalMemory/layout_backup2.js',
        "utf8",
    ).substring(14))

}
