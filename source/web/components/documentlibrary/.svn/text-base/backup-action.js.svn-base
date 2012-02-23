/**
 * DocumentList "Backup" action
 * 
 * @namespace Alfresco
 * @class Alfresco.DocumentList
 */
(function()
{
   /**
    * Backup single document.
    *
    * @method onActionBackup
    * @param file {object} Object literal representing one or more file(s) or folder(s) to be actioned
    */
   Alfresco.doclib.Actions.prototype.onActionBackup = function DL_onActionBackup(file)
   {
      this.modules.actions.genericAction(
      {
         success:
         {
            message: this.msg("message.backup.success", file.displayName)
         },
         failure:
         {
            message: this.msg("message.backup.failure", file.displayName)
         },
         webscript:
         {
            name: "backup/site/{site}/{container}",
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
