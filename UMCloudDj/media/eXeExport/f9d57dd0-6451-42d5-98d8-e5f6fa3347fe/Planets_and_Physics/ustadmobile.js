/*
<!-- This file is part of Ustad Mobile.  
    
    Ustad Mobile Copyright (C) 2011-2013 Toughra Technologies FZ LLC.

    Ustad Mobile is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version with the following additional terms:
    
    All names, links, and logos of Ustad Mobile and Toughra Technologies FZ 
    LLC must be kept as they are in the original distribution.  If any new
    screens are added you must include the Ustad Mobile logo as it has been
    used in the original distribution.  You may not create any new 
    functionality whose purpose is to diminish or remove the Ustad Mobile 
    Logo.  You must leave the Ustad Mobile logo as the logo for the 
    application to be used with any launcher (e.g. the mobile app launcher).  
    
    If you want a commercial license to remove the above restriction you must
    contact us.  
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

    Ustad Mobile is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.




This program is free software.  It is licensed under the GNU GENERAL PUBLIC LICENSE ( http://www.gnu.org/copyleft/gpl.html ) with the following 

GPL License Additional Terms

All names, links, and logos of Ustad Mobile and Toughra Technologies FZ LLC must be kept as they are in the original distribution.  If any new screens are added you must include the Ustad Mobile logo as it has been used in the original distribution.  You may not create any new functionality whose purpose is to diminish or remove the Ustad Mobile Logo.  You must leave the Ustad Mobile logo as the logo for the application to be used with any launcher (e.g. the mobile app launcher).  

If you need a commercial license to remove these restrictions please contact us by emailing info@ustadmobile.com 

-->

*/

/* 

This javascript creates the header and footer of ustad mobile content in packages and does a lot of global actions via the functions (esp Menu Links).

*/

//For jQuery mobile and Cordova/PhoneGap framework configurations.
$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;
	console.log("Mobileinit changes set for jQuery mobile for PhoneGap");

}); //as per jQuery's documentation and Cordova/Phonegap

//Set to 1 for Debug mode, otherwise 0 (will silence console.log messages)
var USTADDEBUGMODE = 1;

/*
Output msg to console.log if in debug mode
*/
function debugLog(msg) {
    if(USTADDEBUGMODE == 1) {
        console.log(msg);
    }
}

var currentUrl = document.URL; 
debugLog("Ustad Mobile: Current Location: " + currentUrl); //For testing purposes.
 
//useful to get TOC link from Menu Page triggered in Content.
var platform="";
var userAgent=navigator.userAgent; //User agent
console.log("User agent is: " + userAgent);

if(navigator.userAgent.indexOf("Android") !== -1){
        platform = "android";
        console.log("You are using Android on ustadmobile.js.");
        
    }else if(navigator.userAgent.indexOf("Safari") !== -1 && navigator.userAgent.indexOf("BB10") == -1){
        platform = "ios";
        debugLog("You are using ios on ustadmobile.js()");

    }else if(navigator.userAgent.indexOf("Windows Phone OS 7.0") !== -1){
        platform = "wp7";
        debugLog("You are using wp7 on ustadmobile.js()");

    }else if(navigator.userAgent.indexOf("Windows Phone OS 7.5") !== -1){
        platform = "wp7.5";
        debugLog("You are using wp7.5 on ustadmobile.js()");

    }else if(navigator.userAgent.indexOf("Windows Phone OS 8.0") !== -1){
        debugLog("You are using wp8 on ustadmobile.js()");
        platform = "wp8";

    }else if(navigator.userAgent.indexOf("BB10") !== -1){
        platform = "bb10";
        //alert("Blackberry detected in ustadmobile.js()");
 
    }else{
        //alert("Could not verify your device or platform. Your device isn't tested with our developers. Error. Contact an ustad mobile developer.");
    }

//Cordova device ready event handler
document.addEventListener("deviceready", onAppDeviceReady, false);

//Global variable set in scroll login. Can be disabled from the Content (!1) to disable scroll.
var scrollEnabled = 1;

/*
 There is an issue with the cloze because eXe sets the width
 according to the number of letters; jQuery mobile wants to 
 make this the width of the screen.  That results in what
 looks like a text box but only a small part being selectable.
*/
function setupClozeWidth() {
    $(".ClozeIdevice input[type=text]").css("width", "");
}

$(document).on("pagebeforecreate", function(event, ui) { //pageinit gets triggered when app start.
    console.log("In pagebeforecreate");
    if(typeof(onLanguageDeviceReady) == "function" ){
        onLanguageDeviceReady();
    }else{ // meaning it is in Content..
        callOnLanguageDeviceReady();
    }
});

function callOnLanguageDeviceReady(){

    if(navigator.userAgent.indexOf("Android") !== -1){
        platform = "android";
        console.log("You are using Android on callOnLanguageDeviceReady().");
        onLanguageContentReady();
    }else if(navigator.userAgent.indexOf("Safari") !== -1 && navigator.userAgent.indexOf("BB10") == -1){
        platform = "ios";
        debugLog("You are using ios on callOnLanguageDeviceReady()");
        onLanguageContentReady();
    }else if(navigator.userAgent.indexOf("Windows Phone OS 7.0") !== -1){
        platform = "wp7";
        debugLog("You are using wp7 on callOnLanguageDeviceReady()");
        onLanguageContentReady();
    }else if(navigator.userAgent.indexOf("Windows Phone OS 7.5") !== -1){
        platform = "wp7.5";
        debugLog("You are using wp7.5 on callOnLanguageDeviceReady()");
        onLanguageContentReady();
    }else if(navigator.userAgent.indexOf("Windows Phone OS 8.0") !== -1){
        debugLog("You are using wp8 on callOnLanguageDeviceReady()");
        platform = "wp8";
        onLanguageContentReady();
    }else if(navigator.userAgent.indexOf("BB10") !== -1){
        platform = "bb10";
        //alert("Blackberry detected in callOnLanguageDeviceReady()");
        onLanguageContentReady();
    }else{
        //alert("Could not verify your device or platform. Your device isn't tested with our developers. Error. Contact an ustad mobile developer.");
    }
    
}

function onLanguageContentReady(){
    console.log("*****************************IN ONLANGUAGECONTENTREADY()!!*******************************");
    if (typeof ustadlocalelang === 'undefined') {
        var ustadlocalelang = "default";
        //ustadlocalelang = "default";
    }

    console.log("App set language is: " + ustadlocalelang );
    var filetype = "js";
    //var baseURL;
    console.log("In ONLANGUAGECONTENTREADY(), platform set in Content is not set. ");
     if (ustadlocalelang != null && filetype=="js"){ //if filename is a external JavaScript file    
        
        //if (platform == "android"){
        if(navigator.userAgent.indexOf("Android") !== -1){
        //var baseURL = localStorage.getItem("baseURL");
        console.log("Detected platform as : Android ");
        var baseURL = "/android_asset/www";
        }else if(navigator.userAgent.indexOf("Windows Phone OS 8.0") !== -1){
            console.log("Detected platform as : Windows Phone 8");
        var baseURL = "/www";
        }else if(navigator.userAgent.indexOf("Safari") !== -1 && navigator.userAgent.indexOf("BB10") == -1){
            console.log("Detected platform as : iOS");
            var baseURL = localStorage.getItem("baseURL");
        }else if(navigator.userAgent.indexOf("BB10") !== -1){
            console.log("Detected platform as : BB10");
            var baseURL = localStorage.getItem("baseURL");
            //alert("BB10TEST: baseUrl: " + baseURL);
        }else{
            console.log("Unable to verify your device or platform. Error.");
            //alert("Your device/platform isn't recgnized by this device. So there will/might be errors. Contact an Ustad Mobile Developer.");
            var baseURL = localStorage.getItem("baseURL");
        }
         //else, platform not set yet.
        //backupfilename = baseURL + "/" + "en.js";
      filename = baseURL + "/locale/" + ustadlocalelang + ".js";      
      console.log("Loading language js: " + filename + " in course (dynamically)..");
         //alert("BB10TEST: Loading language js: " + filename + " in course (dynamically)..");
        //$('head').append($('<script>').attr('type', 'text/javascript').attr('src', backupfilename));
      $('head').append($('<script>').attr('type', 'text/javascript').attr('src', filename));
     }
    console.log(" Content language javascript: " + filename + ".js Loading done.");
    localizePage();
    $.mobile.loading('hide');
}

/*
$(document).on("pageload", function(event, ui) { //pageLoad only gets triggered when we do a mobile.changePage() from within the code. Not when the app starts.
    console.log("In pageload");
});

$(document).on("pageinit", function(event, ui) { //pageinit gets triggered when app start.
    console.log("In pageinit");
    //onLanguageDeviceReady(); //Set / Check the language first. //Commented out because it works in pagebeforecreate instead and hence works with all html strings.
    //localizePage();
});
*/


/*
Even though the documentation says that this should
happen apparently it does not
*/
$(document).on("pageshow", function(event, ui) {
    console.log("In pageshow"); //Means nothing. You can delete this.
    //ui.prevPage.remove(); 
    //Commented out because it messes with going back from a page (it is removed, so throws error)
});


/*
    On Pagechange, the logic for touch, swipe and scroll events are executed.
*/
$(document).on("pagechange", function(event){
    setupClozeWidth();
    $('.ui-page-active').swipe( {   //On the active page..

    //Generic swipe handler for all directions
        //swipe handler to check swipe event.
        swipe:function(event, direction, distance, duration, fingerCount){
                console.log("You swiped " + direction + " for " + distance + "px");
          },
            
        //Swipe handler to handle page changes.
        swipeStatus:function(event, phase, direction, distance, duration) {
                //event.stopPropagation();
                //event.preventDefault();
            if(duration < 1500 && distance > 100 && phase == "end"){
                if(direction=="left"){       
                    exeNextPageOpen();
                    console.log("Registered direction left.");
                }else if(direction =="right"){
                    exePreviousPageOpen();
                }
            }else if(scrollEnabled == 1 && phase == "move"){
                if(direction == "up"){
                    window.scrollBy(0,20);
                }else if(direction == "down"){
                    window.scrollBy(0, -20);
                }               
            }
        },

        //Default is 75px, set to 200 in Ustad Mobile to reduce error reproduction.
         threshold:200,
      }); 
});



//Function called whenever Cordova is ready within the app's navigation.
function onAppDeviceReady(){
    console.log("Cordova device ready (onAppDeviceReady())");
    
    var baseURL = localStorage.getItem("baseURL");
    console.log(" Startup: ustadmobile.js->onAppDeviceReady()->baseURL: " + baseURL);

    //var messageM = localStorage.getItem("testLS");
    //console.log("WPTEST: ustadmobile.js->onAppDeviceReady-> Message: " + messageM);

    
    debugLog(" in onLangDeviceReady()");
    navigator.globalization.getPreferredLanguage(
    
    function langsuccess(language){
       debugLog(" Your device's language is: " +  language.value + "\n");
        var langGlob = language.value;
        if (langGlob == "English"){
            langGlob = "en";
        }
        if (langGlob == "Arabic"){
            langGlob = "ar";
        }
       localStorage.setItem('checklanguage', langGlob); 
    },
    function errorCB(){
        debugLog("Failed to get your device's language.");
    }
    );
    debugLog(" checklanguage set: " + localStorage.getItem('checklanguage'));
}

//When the Menu Loads, this is called. You can write in your actions and code that needs to be run in the start here.
function onMenuLoad(){
	debugLog("Menu triggered: ustadmobile_menuPage/2.html -> ustadmobile.js -> onMenuLoad()");
}

/*
 Localization function - will return original English if not in JSON
*/
function x_(str) {
    if(messages[str]) {
        return messages[str];
    }else {
        return str;
    }
}

/*
 Dummy function to allow strings to be picked up by babel script
*/
function x__(str) {
    return str;
}

/*
Gets called on page load (e.g. before is shown)

pageSelector - class or id selector e.g. .ui-page-active
*/
function localizePage() { 

    console.log("In localizePage()");
    $(".exeTranslated").each(function(index, value) {
        var textToTranslate = $(this).attr("data-exe-translation");
        //var attrTextToTranslate = $(this).attr("data-exe-translation-attr");
        //$('#skipButton').attr( attrTextToTranslate, "Hey");
        //console.log("THE attribute text to translate: " + attrTextToTranslate);
        console.log("text to translate: " + textToTranslate);
        //console.log(" value for: " + value);
        console.log(" translated value: " + x_(textToTranslate)); // Need to include the locale/lang.js file before this is called. 
        $(value).text(x_(textToTranslate));
    });
    
    $(".exeTranslated2").each(function(index, value){
        var attrText = $(this).attr("data-exe-translation-attr");
        console.log("TEST: attrText is: " + attrText);
        var attrTextToTranslate = $(this).attr(attrText);
        var idTextToTranslate = $(this).attr("id");

        console.log("For the attribute: " + attrText + " and id: " + idTextToTranslate + " of value: " + attrTextToTranslate + ", Translation is: " + x_(attrTextToTranslate));
        $("#" + idTextToTranslate).attr(attrText, x_(attrTextToTranslate));
    });

}


/*
//Function reserved to get the app location. This has been moved to: onBLDeviceReady() in ustadmobile-booklist.js .
function getAppLocation(){ //function to get the root of the device.

}
*/

//Function to handle Previous Page button within eXe content's footer.
function exePreviousPageOpen(){
    var previousPageHREF = $(".ui-page-active #exePreviousPage").attr("href");
	debugLog("Ustad Mobile CONTENT: Going to previous page: " + previousPageHREF);
    $.mobile.changePage( previousPageHREF, { transition: "slide", reverse: true }, true, true );
}

//Function to handle First Next Page button within eXe content's footer. (Is not used)
function exeFirstNextPageOpen(){   
    debugLog("Ustad Mobile: in exeFirstNextPageOpen()");
    var nextPageHREF = $(".ui-page-active #exeNextPage").attr("href");
    debugLog("Ustad Mobile: CONTENTT: Going to next page in FirstNextPageOpen: " + nextPageHREF);
    $.mobile.changePage( nextPageHREF, { transition: "none" }, true, true );
}

//Function to handle Next Page button within eXe content's footer.
function exeNextPageOpen(){
    var nextPageHREF = $(".ui-page-active #exeNextPage").attr("href");
    debugLog("Ustad Mobile Content: Going to next page: " + nextPageHREF);  
    $.mobile.changePage( nextPageHREF, { transition: "slide" }, true, true );
}

//Function to handle Menu Page within eXe content's footer.
function exeMenuPageOpen(){
    //Windows Phone checks.
	if($.mobile.path.getLocation("x-wmapp0://www/ustadmobile_menuPage2.html") != "x-wmapp0://www/ustadmobile_menuPage2.html"){
		debugLog('there is path problem');
	}else{
		debugLog('everything is OK with paths');
	}
	debugLog("Ustad Mobile Content: You will go into: exeMenuPage " + exeMenuPage2);

    //if( platform == "android" ){
    if(navigator.userAgent.indexOf("Android") !== -1){
        var exeMenuLink2 = localStorage.getItem("baseURL") + "/" + exeMenuPage2;
	    debugLog("Ustad Mobile Content: ANDROID: You will go into: exeMenuLink " + exeMenuLink2);	
    }else if(navigator.userAgent.indexOf("Windows Phone OS 8.0") !== -1){	//Currently only Windows Phone checks.
	    var exeMenuLink2 = "/www/" + exeMenuPage2;
        debugLog("Ustad Mobile Content: WINDOWS PHONE 8: You will go into: exeMenuLink " + exeMenuLink2);
    }else if(navigator.userAgent.indexOf("Safari") !== -1 && navigator.userAgent.indexOf("BB10") == -1){
        //Do nothing
        console.log("Detected your device platform as: iOS!");
        var exeMenuLink2 = localStorage.getItem("baseURL") + "/" + exeMenuPage2;
	    debugLog("Ustad Mobile Content: iOS: You will go into: exeMenuLink " + exeMenuLink2);
    }else if(navigator.userAgent.indexOf("BB10") !== -1){
        //Do nothing
        console.log("Detected your device platform as: Blackberry 10!");
        var exeMenuLink2 = localStorage.getItem("baseURL") + "/" + exeMenuPage2;
	    debugLog("Ustad Mobile Content: Blackberry 10: You will go into: exeMenuLink " + exeMenuLink2);
        //alert("BB10TEST: Ustad Mobile Content: Blackberry 10: You will go into: exeMenuLink " + exeMenuLink2);
    }else{
        console.log("Unable to detect your device platform. Error.");	
    }
    $.mobile.changePage( exeMenuLink2, { transition: "slideup" } );
}

//Function to handle Menu Page within Book List's footer.
function booklistMenuPageOpen(){
	debugLog("Ustad Mobile App: You will go into: exeMenuPage " + exeMenuPage);
    var exeMenuLink = localStorage.getItem("baseURL") + "/" + exeMenuPage;
    debugLog("Ustad Mobile App: You will go into: exeMenuLink " + exeMenuLink);	
    $.mobile.changePage( exeMenuPage, { transition: "slideup" } );
}

//Function to open various links in the Menu.
function openMenuLink(linkToOpen, transitionMode){
	debugLog("Ustad Mobile: In openMenuLink(linkToOpen), About to open: " + linkToOpen);
    //if(platform == "android"){
    if(navigator.userAgent.indexOf("Android") !== -1){
        //Do nothing
        //linkToOpen = linkToOpen;
    }else if(navigator.userAgent.indexOf("Windows Phone OS 8.0") !== -1){
	    //if(device is windows phone){
		    linkToOpen = "/" + linkToOpen; //x-wmapp0: will be appended.
	    //}
    }else if(navigator.userAgent.indexOf("Safari") !== -1 && navigator.userAgent.indexOf("BB10") == -1){
        console.log("Detected iOS platform.");
        //Do nothing
    }else if(navigator.userAgent.indexOf("BB10") !== -1){
        console.log("Detected Blackberry 10 platform.");
        //Do nothing
    }else{
        console.log("Your platform cannot be detected. Error.");
    }
	debugLog("Ustad Mobile: In openMenuLink(linkToOpen), About to open (post wp check): " + linkToOpen);
	$.mobile.changePage(linkToOpen, { changeHash: false, transition: transitionMode});
}

//Your last page code goes here (or it goes in: resumeLastBookPage() which ever you call it from ustabmobile_booklist.html.
function exeLastPageOpen(){
    console.log("Going to the last page as per eXe..");
}

//openPage2 named with a 2 so that doesnt' confuse with other page's openPage() functions, if any.
//openPage2 is the one that calls window.open (not changePage() of jQuery).
function openPage2(openFile){
    console.log("Opening page, platform is: " + platform);
    //if(platform == "android"){
    if(navigator.userAgent.indexOf("Android") !== -1){
        openFile = localStorage.getItem('baseURL') + "/" + openFile;
        //openFile = "/www/" + openFile;
        //Do nothing, openFile = "ustadmobile_file.html";
    }else if(navigator.userAgent.indexOf("Windows Phone OS 8.0") !== -1){
        openFile = "//www/" + openFile;
    }else if(navigator.userAgent.indexOf("Safari") !== -1 && navigator.userAgent.indexOf("BB10") == -1){
        //Do nothing.
        console.log("Detected your device is iOS");
    }else if(navigator.userAgent.indexOf("BB10") !== -1){
        //var baseurl = localStorage.getItem("baseURL");
        //openFile = "" + openFile;
        //Do nothing.
        console.log("Detected your device is Blackberry 10");
    }else{
        console.log("Unable to detect your device platform. Error.");
    }
    console.log("Menu Links: Going to page: " + openFile);
    //alert("BB10TEST: Menu Links: Going to page: " + openFile);
	//window.open(openFile).trigger("create");
    //window.open(openFile);
    //window.open(openFile, '_self'); //BB10 specific changes so that it loads in current child webview
    window.open(openFile, '_blank');
}


//function that opens Books. this uses openPage2() because it needs to reload the page.
function openBookListPage(){
	$.mobile.loading('show', {
        text: x_('Ustad Mobile: Loading..'),
        textVisible: true,
        theme: 'b',
        html: ""}
    );
	openPage2("ustadmobile_booklist.html");
}

//duplicated function for testing purposes..
function openBookListPage2(){
	$.mobile.loading('show', {
        text: x_('Ustad Mobile: Loading..'),
        textVisible: true,
        theme: 'b',
        html: ""}
    );
	openPage2("ustadmobile_booklist.html"); // Used to be ../ustadmobile_booklist.html
    
}
//Function to log out and get back to the login page.
function umMenuLogout(){
    $.mobile.loading('show', {
        text: x_('Ustad Mobile:Logging Out..'),
        textVisible: true,
        theme: 'b',
        html: ""}
    );
    localStorage.removeItem('username');
    localStorage.removeItem('password');
	openPage2("ustadmobile_login.html");
}  

//Function to log out and get back to the login page from the content. This will show a slightly different login page because we want to maintain a constant gui.
//Does the same as umMenuLogout()..
function umMenuLogout2(){
    $.mobile.loading('show', {
        text: x_('Ustad Mobile:Logging Out..'),
        textVisible: true,
        theme: 'b',
        html: ""}
    );
	//Commented because localStoage of app is not accessible on windows phone
    //localStorage.removeItem('username');
    //localStorage.removeItem('password');
    openPage2("ustadmobile_login2.html");
}

//This function gets called from the Book List Menu to go back to the Login Page from the Menu.
function openLoginPage(){
	$.mobile.loading('show', {
        text: x_('Ustad Mobile: Loading..'),
        textVisible: true,
        theme: 'b',
        html: ""}
    );
	openMenuLink("ustadmobile_login2.html", "slide");
}

//This function is called from the Book List Meny to go to the download pakcages Page from the Menu.
//We have decided to not allow user to access the Download Packages page whilist in a book (for reduction in complexity).
function openGetPackagesPage(){
	$.mobile.loading('show', {
        text: x_('Ustad Mobile:Loading..'),
        textVisible: true,
        theme: 'b',
        html: ""}
    );
	openMenuLink("ustadmobile_getPackages.html", "slide");
}

//Function to open Settings and Languages page (Preferences)
function openSetLanguagesPage(){
	$.mobile.loading('show', {
        text: x_('Ustad Mobile:Loading..'),
        textVisible: true,
        theme: 'b',
        html: ""}
    );
	openMenuLink("ustadmobile_setLanguage.html", "slide");
}

//Function available to test refreshing a page. Not tested.
function refreshPage(pageToRefresh)
{
	console.log("Refreshing page: " + pageToRefresh);
    $.mobile.changePage(pageToRefresh, {
        allowSamePageTransition: true,
        transition: 'none',
        reloadPage: true
    });
}

//Function to open the About Ustad Mobile page from within the Menu (both from Book List and eXe content).
function openAboutUM(){
	$.mobile.loading('show', {
        text: x_('Ustad Mobile..'),
        textVisible: true,
        theme: 'b',
        html: ""}
    );
    var	aboutLink = "ustadmobile_aboutus.html"; //Maybe make this a global variable ?..
    
	//aboutLink = "/" + aboutLink; 
    openMenuLink(aboutLink, "slide");
	//$.mobile.changePage(aboutLink, { changeHash: false, transition: "slide"});
}

function openTOCPage(){
	$.mobile.loading('show', {
        text: x_('Loading TOC..'),
        textVisible: true,
        theme: 'b',
        html: ""}
    );

    //console.log("Current location: " + document.URL);
    //var contentUrl = document.referrer;
    //console.log("Content / Previous location: " + contentUrl);
    //alert("Book url: " + currentBookPath);
	//var tableOfContentsPage = contentUrl + "/exetoc.html";
	//var tableOfContentsPage = "exetoc.html";
    var tableOfContentsPage = currentUrl; //Not tested for Windows Phone yet.
    debugLog("Going to Table of Contents page: " + tableOfContentsPage);
    $.mobile.changePage( tableOfContentsPage, { transition: "slideup", reverse: true} );	
}

//Test function. Does nothing. Delete it.
function listPackagesFromServer2(){
		alert("Works..");
	}
function initTableOfContents() {
    $(document).on("pageinit", "#exemainpage", function () {
        tocClicked = false;
        var screenWidth = $(window).width();
        var widthPerButton = 40;
        var baseWidthReduction = 100;
        for(var i = 0; i < 6; i++) {
            $(".buttonLevel"+i).width(screenWidth - (baseWidthReduction+(widthPerButton*i)));
        }
    });    
}

/*
This function is used to control show/hide section
buttons.  Unfortunately JQuery mobile does not like
changing icons on buttons, so we actually make two of
them each inside their own span and hide them
*/
function tocTrigger(tocId, toShow) {
    if(toShow == true) {
        $("#tocButtonShowSpan" + tocId).hide();
        $("#tocButtonHideSpan" + tocId).show();
        $("#tocDiv" + tocId).show();
        $("#tocButtonHideSpan" + tocId).bind("click", function() { eval("tocTrigger('" + tocId +"', false)"); });
        $("#tocButtonShowSpan" + tocId).unbind("click");
    }else {
        $("#tocButtonShowSpan" + tocId).show();
        $("#tocButtonHideSpan" + tocId).hide();
        $("#tocDiv" + tocId).hide();
        $("#tocButtonShowSpan" + tocId).bind("click", function() { eval("tocTrigger('" + tocId +"', true)"); });
        $("#tocButtonHideSpan" + tocId).unbind("click");

    }    
}


