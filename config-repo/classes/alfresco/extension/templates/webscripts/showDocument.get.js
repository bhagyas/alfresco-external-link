function main(){
	// check that search term has been provided
	var documentShortLink = url.templateArgs['documentShortLink']
	if (documentShortLink == undefined || documentShortLink.length == 0)
	{
	   status.code = 400;
	   status.message = "Search term has not been provided." + documentShortLink;
	   status.redirect = true;
	}
	else
	{
	   var searchQuery = "@sc\\:shortLink:\"" + documentShortLink + "\"";
	   // perform search
	   var nodes = search.luceneSearch(searchQuery);
	   var searchResult = nodes[0];
	   var expiryDate = searchResult.properties["sc:expiresOn"];
	   var today = new Date();

	   //do not show if the document has expired. show an expired page instead.
	   if(expiryDate < today){
		   status.code = 410;
		   status.message = "Document expired on " + expiryDate;
		   status.redirect = true;
	   }
	   
	   //look for an extension within the url
	   var requestedExtension = url.extension.split("\\.")[1];
	   
	   if(requestedExtension != null){

		   var renditionName = "rendition"+ requestedExtension;
		   
		   //1. Investigate if the rendition exists...
		   var existingRenditions = renditionService.getRenditions(nodes[0]);
		   var existingRenditionFound = null;
		   
		   if(existingRenditions != null && existingRenditions.length > 0) {
			   //do nothing for now. todo : implement a search and return rendition instead of rendering it again.
			   
			   for(var x = 0; x < existingRenditions.length; x++){
				   
				   logger.log(existingRenditions[x]);
				   if(null != existingRenditions[x] ){
					
					   var node = search.findNode(existingRenditions[x].nodeRef);
					   
					   logger.log(node.properties["cm:name"]);
					   if(node.properties["cm:name"] != null){
						   logger.log(renditionName);
						   if(node.properties["cm:name"] == renditionName){
							   existingRenditionFound = node; //thats it.
						   }   					   
					   }
				   }
					   
			   }   
		   }

		   if(existingRenditionFound == null){
			 //2. If not create definition
			   var renditionEngineName = "reformat";
			   
			   var renditionDef = renditionService.createRenditionDefinition(renditionName, renditionEngineName)
			   
			   //setting the mime type 
			   var requestedMimeType = guessMimeType(requestedExtension);
			   
			   if(requestedMimeType != null){
				   renditionDef.parameters['mime-type'] = requestedMimeType;
				   //3. Render...
				   var renditionNodeRef = renditionService.render(nodes[0], renditionDef);
				   model.contentNode = renditionNodeRef; 
				   
			   }else{
				   model.contentNode = nodes[0];
			   }
		   }else{
			   model.contentNode  =  existingRenditionFound; //show the existing rendition
		   }
		   
	   }else{
		   model.contentNode = nodes[0];
	   }
	   
	}
}

/**
 * Guesses and returns the mime type based on the file extension provided.
 * 
 * */
function guessMimeType(fileExtension){
	for(var x = 0; x < extensions.length; x++){
		if(extensions[x][0] == fileExtension){
			return extensions[x][1];
		}
	}
	return null;
}

/**
 * A manually implemented list of file extensions against the mime types.
 * */
var extensions = [
                  ["pdf","application/pdf"],
                  ["txt","text/plain"],
                  ["gif","image/gif"],
                  ["jpg","image/jpeg"],
                  ["html","text/html"],
                  ["doc","application/msword"]
              	];

main();