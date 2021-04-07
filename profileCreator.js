const fs = require('fs')
const { Notification } = require('electron');



function writeDataToXml(data, filename) {
    fs.writeFile(filename, data, (err) => {
        // In case of a error throw err. 
        if (err) {
            if (qrCode.style.display != "none") {
                qrCode.style.display = "none";
            }
            if (helpText.style.display != "none") {
                helpText.style.display = "none";
            }
            throw err;
        }
        else {
            var helpText = document.getElementById("createProfileConfirmation");
            var qrCode = document.getElementById("canvas");
            if (helpText.style.display === "none") {
                helpText.style.display = "block";
                setTimeout(function () {
                    helpText.style.display = "none";
                }, 15000);
            }
            if (qrCode.style.display === "none") {
                qrCode.style.display = "block";
            }
        }
    })
}

function formToXml(form) {
    var xmldata = ['<?xml version="1.0"?>'];
    xmldata.push("<form>");
    var inputs = form.elements;
    for (var i = 0; i < inputs.length; i++) {
        var el = document.createElement("ELEMENT");
        if (inputs[i].name && inputs[i].checked) {
            el.setAttribute("name", inputs[i].name);
            el.setAttribute("value", inputs[i].value);
            xmldata.push(el.outerHTML);
        }
    }
    xmldata.push("</form>");
    return xmldata.join("\n");
}


function createProfile(form) {

    var data = formToXml(form);
    console.log(data);

    writeDataToXml(data, "public/output.xml");
}