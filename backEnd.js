//Setting up global variables to be used throughout the website
var year = -1;
var month = -1;
var day = -1;
//Stores data for past like images
var likedImages = new Map();
//Stores data for current image being shown
var currImage = {};


/*
    Function:  getRandomDate
    Purpose:   Gets a random date between Dec 31 1996 and Dec 31 2020
    Changes:   Updates global vars with newly gathered data
*/
function getRandomDate(){
    year = Math.floor(Math.random() * (2020 - 1996)) + 1996;
    month = Math.floor(Math.random() * (13 - 1)) + 1;
	day = Math.floor(Math.random() * (31 - 1)) + 1;
}


/*
    Function:  fetchImage
    Purpose:   Fetches a result from Nasa API and takes that information to display on html
    Changes:   Displays new information on html
*/
function fetchImage(){
    //Creates a loading state while fetch is being completed
    document.getElementById("nasaResult").innerHTML = "<h1 class = 'load'>Loading...</h1>";
    document.getElementById("likeAndUnlike").innerHTML = " ";
    //gets a random date used to be searched
    getRandomDate();
    //searches Nasa's API with the random date from global variables
    fetch('https://api.nasa.gov/planetary/apod?date='+year+'-'+month+'-'+day+'&api_key=ywm5csLvbUYoXTCQIulEcfuCJM1agfRfNrNgVb9p')
    .then(res=>res.json())
    //gets img data from the respone
    .then(data => {
        //Creating and populating page with like button for current img
        document.getElementById("likeAndUnlike").innerHTML = '<br><input type="image" id="'+data.title+'" alt="like" src="static/like.png" onclick="likeAndUnlike(this.id)" class="likeImg">';
        //Displays img from data gathered by response and populates the page
        document.getElementById('nasaResult').innerHTML= '<img id = "responeImage" src = "'+data.hdurl+ '"alt = "'+data.explanation+'"/><br><h1>'+data.title+'</h1><p>'+data.explanation+'</p></h1><h2>Date Captured '+data.date+'</h2><a href="'+data.hdurl+'">Share Image Link Here!</a>';
        currImage = data;
    });
    //gets and displays all liked images
    fetchLikedImages();
};


/*
    Function:  likeAndUnlike
    Purpose:   likes or unlikes an image
    in:        id of the current button being pressed
    Changes:   removes or adds image from likedImages and updates the button png being displayed
*/
function likeAndUnlike(buttonID){
    //if the image is already in likedImages
    if(likedImages.has(buttonID)){
        //then removes that images data from liked images
        likedImages.delete(buttonID);
        //changes button to appear as a like png
        document.getElementById("likeAndUnlike").innerHTML = '<br><input type="image" id="'+buttonID+'" alt="like" src="static/like.png" onclick="likeAndUnlike(this.id)" class="likeImg">';
    }
    //if image in not already in likedImages
    else{
        //then adds that images data from liked images
        likedImages.set(currImage.title,currImage);
        //changes button to appear as an unlike png
        document.getElementById("likeAndUnlike").innerHTML = '<br><input type="image" id="'+buttonID+'" alt="unlike" src="static/unlike.png" onclick="likeAndUnlike(this.id)" class="likeImg">';
    }
    //refreshes the liked images
    fetchLikedImages();
}


/*
    Function:  fetchLikedImages
    Purpose:   gets all previously liked images data to display on html
    Changes:   updates liked images on html
*/
function fetchLikedImages(){
    //temp variable to be set as new html
    var result = "";
    //indexes through all data in likedImages
    for(var [key,value] of likedImages.entries()){
        //sets up image and link display
        result += '<img id = "responeImage" src = "'+likedImages.get(key).hdurl+ '"alt = "'+likedImages.get(key).explanation+'"/><br><h1>'+likedImages.get(key).title+'</h1><p>'+likedImages.get(key).explanation+'</p><h2>Date Captured '+likedImages.get(key).date+'</h2> <a href="'+likedImages.get(key).hdurl+'">Share Image Link Here!</a>';
        //sets up unlike button
        result += '<br><input type="image" id="'+likedImages.get(key).title+'" alt="like" src="static/unlike.png" onclick="likeAndUnlike(this.id)" class="likeImg">'
    }
    //updates html with new results
    document.getElementById('likedImages').innerHTML= result;
}