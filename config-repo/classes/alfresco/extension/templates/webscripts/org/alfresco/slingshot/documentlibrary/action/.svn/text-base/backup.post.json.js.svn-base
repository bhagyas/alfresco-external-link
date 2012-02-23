<import resource="classpath:/alfresco/templates/webscripts/org/alfresco/slingshot/documentlibrary/action/action.lib.js">

/**
 * Backup multiple files action
 * @method POST
 */

/**
 * Entrypoint required by action.lib.js
 *
 * @method runAction
 * @param p_params {object} Object literal containing files array
 * @return {object|null} object representation of action results
 */
function runAction(p_params)
{
   var results = [];
   var files = p_params.files;
   var file, fileNode, result, nodeRef;

   // Find destination node
   var destNode = p_params.rootNode.childByNamePath("/Backup");
   if (destNode == null)
   {
      destNode = p_params.rootNode.createFolder("Backup");
   }

   // Must have destNode by this point
   if (destNode == null)
   {
      status.setCode(status.STATUS_NOT_FOUND, "Could not find or create /Backup folder.");
      return;
   }

   // Must have array of files
   if (!files || files.length == 0)
   {
      status.setCode(status.STATUS_BAD_REQUEST, "No files.");
      return;
   }

   for (file in files)
   {
      nodeRef = files[file];
      result =
      {
         nodeRef: nodeRef,
         action: "backupFile",
         success: false
      }

      try
      {
         fileNode = search.findNode(nodeRef);
         if (fileNode === null)
         {
            result.id = file;
            result.nodeRef = nodeRef;
            result.success = false;
         }
         else
         {
            result.id = fileNode.name;
            result.type = fileNode.isContainer ? "folder" : "document";
            // copy the node to the backup folder
            result.nodeRef = fileNode.copy(destNode);
            result.success = (result.nodeRef !== null);
         }
      }
      catch (e)
      {
         result.id = file;
         result.nodeRef = nodeRef;
         result.success = false;
      }

      results.push(result);
   }

   return results;
}

/* Bootstrap action script */
main();
