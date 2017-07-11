var pageCounter = 1;
var animalContainer = document.getElementById("animal-info");
var botn = document.getElementById("btn");//now we want to happen an event when a button is clicked. so adding event listener.

botn.addEventListener("click", function(){ //this is a nonymous function
    var ourRequest = new XMLHttpRequest();
//we need to say our variable to do something. our web browser will expect a method name to open.so we do...
ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' +pageCounter+ '.json'); //here we mae the url dynamic by adding the variable(pageCounter).
//in the brackets above it's our turn what we want to do, so we pass two parmeters.in first aurement we specifies whether to send data or recieve data. to send data to a server we use POST and to recieve data we use GET. In second argument we write the URl we need to talk too. this line of code says variable to get JSON data from that url, so now time to do something with that data.
ourRequest.onload = function(){//ths specifies what should be happen when the data is loaded. so we set the                                     variable to anonymous function(function without name)
    if(ourRequest.status >= 200 && ourRequest.status < 400){//error handling is correct but the server itself has an error.
       var ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);//We need to call the function which we created for html elemtns, in order to work with data we need to pass the variale ourData as parametes.
    }else{
        console.log("we connected to the server but returned an error.");
    }
    //if need to access only the first array, we get [ because our browser doesnt no the data is a array of objects, it just thinks the whole thing is a plain text. we need tell the browser that this a Json data with arrays and objects. so we need to use JSON.parse()
};//till this we just define the text so we need to send the text.
    
ourRequest.onerror = function(){
    console.log("connection erroe");//but in real world we write something else useful.
};                //we can write error handling of ajax here.
ourRequest.send();//here we sending the text.this is just for texting purpose whether we got the text from the url are not. now we need to do save the data which we got from the URl to variable.
//here the data loads directly when the page is loaded, but we dont want that, we need to get data when the button is clicked.
pageCounter++;//here we need to increase the page counter value every tie the button is clicked. 
    if(pageCounter>3){
        document.getElementById('btn').style.visibility = "hidden"; //this cndition specifies when the button pressed more three time it gong to be hide as we no tha ther no more links in the URL.
    }
});

/*line 10 consle.log is just for testing purpose, but we need to add html paragraph elements. we need to write code here to html elements, to get organised 
we need to create a new function, this function main job is to create and add html to the page. so creating a function.*/

function renderHTML(data) {
    var htmlString = ""; //for looping purpose with array we can define a for loop.
    for(i=0;i<data.length;i++){
        //here we specifies what need to happen in the array. so we need to add or concatinate the html string.
        htmlString += "<p>" + data[i].name + ' is a '+ data[i].species + "that like to eat ";//if save load the page we get the data on the screen by presiing the button,
             for (ii=0;ii<data[i].foods.likes.length;ii++){
                 if(ii == 0){
                 htmlString += data[i].foods.likes[ii];
                }else{
                    htmlString += " and " + data[i].foods.likes[ii];
                }                                  //here we loop to there favorie food.
             }
        //we get the same data every time we click, but we want different data when ever click the button. the biggest part of ajax is we need to get right data for right time. for examplee we need to get for click -1 data for second click -2 data. and so on and need to stop whent there is no more. so we need to create a variable and it increase each time the button gets clicked.
    // data represents the array of the objects.
    htmlString += '. And dislikes ';
     for (j=0;j<data[i].foods.dislikes.length;j++){
                 if(ii == 0){
                 htmlString += data[i].foods.dislikes[j];
                }else{
                    htmlString += " " + data[i].foods.dislikes[j];
                }                                  //here we loop to there favorie food.
             }
            htmlString += '.</p>';
    }
    animalContainer.insertAdjacentHTML('beforeend', htmlString);//instead for spelling the text directly create a variable and call it as parameter.
    //we need to pass this to function in line 10. so we need to pass parameters(any name)in this function as we assigned a parameter in                             the calling function line10. so we need to call the Json data using the parameter.this function work is to add html to the page so                                 we need to addd to the empty div element.now creating a variable that points towards the empty div.then we need to target the                                empty div in the function. use this method insertAdjacentHTML(); this contans the parmeters as before or after and 2 nd parmenter as the                           content we need to add.
    
}