<div class="form-field" >
   <#if form.mode == "view">
      <div class="viewmode-field" style="color:red;background-color:white;">
         <span class="viewmode-label">${field.label?html}:</span>
         <span class="viewmode-value"><#if field.value == "">${msg("form.control.novalue")}<#else>
         
         	<a href="${url.server}${url.context}/proxy/alfresco/labs/show/document/${field.value?html}">
         		${url.server}${url.context}/proxy/alfresco/labs/show/document/${field.value?html}
         	</a>
         
         </#if></span>
      </div>
   <#else>
      <label for="${fieldHtmlId}">${field.label?html}:</label>
      <input id="${fieldHtmlId}" type="text" value="${field.value?html}" disabled="true"
             title="${msg("form.field.not.editable")}"
             <#if field.control.params.styleClass??>class="${field.control.params.styleClass}"</#if>
             <#if field.control.params.style??>style="${field.control.params.style}"</#if> />
   </#if>
</div>