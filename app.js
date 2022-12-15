//The URIs of the REST endpoint
IUPS = "https://prod-14.ukwest.logic.azure.com:443/workflows/ece213b15ef84557a8291bd81df20d7e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Btht9wHCPStKpszipZ-lvsNptQ8qpkcYo1L-mi5bD58";
RAI = "https://prod-29.ukwest.logic.azure.com:443/workflows/0a85227c8dcd4da381462c3af611141f/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=gX8Yuf-qhKC06My7Oa8gcKv9ELdI0qyzFw1kgjwIjDI";

BLOB_ACCOUNT = "https://imgshareb00758703.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  //Create a form data object
   submitData = new FormData();
   //Get form variables and append them to the form data object
   submitData.append('MovieName', $('#MovieName').val());
   submitData.append('MovieGenre', $('#MovieGenre').val());
   submitData.append('YearOfRelease', $('#YearOfRelease').val());
   submitData.append('MovieInfo', $('#MovieInfo').val());
   submitData.append('File', $("#UpFile")[0].files[0]);
  
   //Post the form data to the endpoint, note the need to set the content type header
   $.ajax({
   url: "https://prod-14.ukwest.logic.azure.com:443/workflows/ece213b15ef84557a8291bd81df20d7e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Btht9wHCPStKpszipZ-lvsNptQ8qpkcYo1L-mi5bD58",
   data: submitData,
   cache: false,
   enctype: 'multipart/form-data',
   contentType: false,
   processData: false,
   type: 'POST',
   success: function(data){
  
   }
   });
  }
  

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){
  //Replace the current HTML in that div with a loading message
   $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
   $.getJSON(RAI, function( data ) {
   //Create an array to hold all the retrieved assets
   var items = [];
  
   //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
   $.each( data, function( key, val ) {
   items.push( "<hr />");
   items.push("<img src='"+ BLOB_ACCOUNT + val["filePath"] +"' width='400'/> <br />")
   items.push( "Movie : " + val["MovieName"] + "<br />");
   items.push( "Movie Genre: " + val["MovieGenre"] +"<br />");
   items.push( "Year Of Release: " + val["YearOfRelease"] + "<br />");
   items.push( "Movie Info: " + val["MovieInfo"] + "<br />");
   items.push( "<hr />");
   });
   //Clear the assetlist div
   $('#ImageList').empty();
   //Append the contents of the items array to the ImageList Div
   $( "<ul/>", {
   "class": "my-new-list",
   html: items.join( "" )
   }).appendTo( "#ImageList" );
   });
  }

