// Grab the entire url for this page including the attached GET values
const currentUrl = window.location.href;
// console.log(currentUrl);

// Divide the url into two halves
const everything = currentUrl.split('?');
// console.log(everything);

//Grab just the second part
//let formData = everything[1];
//console.log(formData);

// Break the form name values pairs into an array
//formData = formData.split('&');
//console.log(formData);

// Combine it into a single statement
let formData = everything[1].split('&');
// console.log(formData);

function show(cup) {
    // console.log(cup);
    formData.forEach((element) => {
        // console.log(element)
        if (element.startsWith(cup)) {
            //console.log("Found a Match");
            result = element.split('=')[1].replace("%40", "@");;
            //result = result.replace("%40", "@");
        } // end if
            
    }) // Represents each item as one element
    return(result);
} // end show

// const showInfo = document.querySelector('#results');
// showInfo.innerHTML = formData[0] + formData[1]; comment of comment
// showInfo.innerHTML = show("email");

// show("phone")

const showInfo = document.querySelector('#results');
showInfo.innerHTML = `
<p>Appointment for ${show("first")} ${show("last")}</p>
<p>Proxy ${show("ordinance")} on ${show("fecha")} in the ${show("location")} Temple. </p>
<p>Your phone: ${show("phone")}</p>
<p>Your email: ${show("email")}</p>
`