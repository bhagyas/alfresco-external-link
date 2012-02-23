/**
 * DocumentList "Publish" action
 * 
 * @namespace Alfresco
 * @class Alfresco.DocumentList
 */
(function()
{
   /**
    * Publish single document.
    *
    * @method onActionPublish
    * @param file {object} Object literal representing one or more file(s) or folder(s) to be actioned
    */
   Alfresco.doclib.Actions.prototype.onActionPublish = function DL_onActionPublish(file)
   {
      this.modules.actions.genericAction(
      {
         success:
         {
            message: this.msg("message.publish.success", file.displayName)
         },
         failure:
         {
            message: this.msg("message.publish.failure", file.displayName)
         },
         webscript:
         {
            name: "publish/site/{site}/{container}",
            method: Alfresco.util.Ajax.POST
         },
         params:
         {
            site: this.options.siteId,
            container: this.options.containerId
         },
         config:
         {
            requestContentType: Alfresco.util.Ajax.JSON,
            dataObj:
            {
               nodeRefs: [file.nodeRef]
            }
         }
      });
   };
})();
