function setType(type) {
    document.cookie = "calculationType=" + type;
    window.location.replace("riskFactors.html");
}
//property crime rate per 100,000 pop.
crimedb = {
    AL: 3177, AK: 2760, AZ: 3194, AR: 3338, CA: 2441, CO: 2530, CT: 1920, DE: 2982, DC: 5182, FL: 3415, GA: 3281,
    HI: 3050, ID: 1854, IL: 2075, IN: 2649, IA: 2093, KS: 2735, KY: 2246, LA: 3458, ME: 1986, MD: 2507, MA: 1857,
    MI: 2043, MN: 2297, MS: 2921, MO: 2906, MT: 2472, NE: 2523, NV: 2625, NH: 1962, NJ: 1734, NM: 3542, NY: 1718,
    NC: 2873, ND: 2110, OH: 2799, OK: 2990, OR: 2879, PA: 1931, RI: 2173, SC: 3460, SD: 1863, TN: 3060, TX: 3019,
    UT: 2878, VT: 1524, VA: 1930, WA: 3706, WV: 2034, WI: 2088, WY: 1964

};

vehicledb = {
    AL: 1.37, AK: 1.57, AZ: 1.47, AR: 1.38, CA: 1.02, CO: 1.21, CT: 0.87, DE: 1.16, DC: 0.87, FL: 1.44, GA: 1.26,
    HI: 1.02, ID: 1.38, IL: 1.02, IN: 1.14, IA: 0.96, KS: 1.42, KY: 1.56, LA: 1.58, ME: 1.14, MD: 0.93, MA: 0.58,
    MI: 1.0, MN: 0.62, MS: 1.67, MO: 1.26, MT: 1.46, NE: 1.09, NV: 1.11, NH: 0.76, NJ: 0.82, NM: 1.35, NY: 0.77,
    NC: 1.2, ND: 1.18, OH: 1.01, OK: 1.33, OR: 1.16, PA: 1.09, RI: 1.04, SC: 1.80, SD: 1.38, TN: 1.3, TX: 1.38,
    UT: 0.86, VT: 0.93, VA: 0.98, WA: 0.92, WV: 1.51, WI: 0.96, WY: 1.30
};

disasterdb = {
    AL: 79, AK: 45, AZ: 63, AR: 70, CA: 250, CO: 80, CT: 30, DE: 21, DC: 67, FL: 122, GA: 60, HI: 45, ID: 40, IL: 60,
    IN: 48, IA: 62, KS: 60, KY: 74, LA: 75, ME: 55, MD: 32, MA: 47, MI: 36, MN: 60, MS: 68, MO: 68, MT: 60, NE: 60,
    NV: 67, NH: 46, NJ: 50, NM: 79, NY: 93, NC: 58, ND: 56, OH: 54, OK: 167, OR: 73, PA: 59, RI: 22, SC: 28, SD: 59,
    TN: 68, TX: 254, UT: 31, VT: 43, VA: 64, WA: 132, WV: 67, WI: 46, WY: 30
};

function calculateRisk(state, propertyValue, milesPerYear) {

    //property crime risk
    if(crimedb[state] < 2000){
        document.cookie = "crimeRisk=low";
    }else if(crimedb[state] > 3000){
        document.cookie = "crimeRisk=high";
    }else{
        document.cookie = "crimeRisk=mid";
    }

    //disaster risk
    if(disasterdb[state] < 50){
        document.cookie = "disasterRisk=low";
    }else if(disasterdb[state] > 100){
        document.cookie = "disasterRisk=high";
    }else{
        document.cookie = "disasterRisk=mid";
    }

    //property value
    if(parseInt(propertyValue) < 200000){
        document.cookie = "propertyValue=low";
    }else if(parseInt(propertyValue) > 500000){
        document.cookie = "propertyValue=high";
    }else{
        document.cookie = "propertyValue=mid";
    }

    //vehicle fatal crash risk
    if(vehicledb[state]*(parseInt(milesPerYear)/15000) < 0.80){
        document.cookie = "crashRisk=low";
    }else if(vehicledb[state]*(parseInt(milesPerYear)/15000) > 1.25){
        document.cookie = "crashRisk=high";
    }else if(parseInt(milesPerYear) == 0){
        document.cookie = "crashRisk=none";
    }else{
        document.cookie = "crashRisk=mid";
    }

    window.location.replace("results.html");

}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/*
var crime = 0, pages = 99, page = 0;

function propertyRisk(state, propertyValue) {

    while(page < pages){
            page++;
            alert(page + "/" + pages);
            $.getJSON("http://api.usa.gov/crime/fbi/sapi/api/summarized/state/ga/property-crime/2017/2017?" +
                "api_key=aA4RgYoTHAcq272DNZNKiMeYP39hRtlGde2Jhtat&page=" + page, function(data){
                alert();
                for (i in data.results){
                    crime += parseInt(data.results[i].actual);
                }
                pages = parseInt(data.pagination.pages);
                alert("crime: " + crime + "| pages: " + pages);
            });
        }
}
*/