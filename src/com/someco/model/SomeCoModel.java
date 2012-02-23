package com.someco.model;

import org.alfresco.service.namespace.QName;

public interface SomeCoModel {

	public static final String NAMESPACE_SOMECO_CONTENT_MODEL  = "http://www.someco.com/model/content/1.0";
    
	// Types
    
    // Aspects
    public static final QName ASPECT_SC_WEBABLE = QName.createQName(NAMESPACE_SOMECO_CONTENT_MODEL, "webable");
    
    // Properties
    public static final QName PROP_PUBLISHED = QName.createQName(NAMESPACE_SOMECO_CONTENT_MODEL,"published");
    public static final QName PROP_IS_ACTIVE = QName.createQName(NAMESPACE_SOMECO_CONTENT_MODEL,"isActive");
    public static final QName PROP_SHORT_LINK = QName.createQName(NAMESPACE_SOMECO_CONTENT_MODEL,"shortLink");
    public static final QName PROP_EXPIRES_ON = QName.createQName(NAMESPACE_SOMECO_CONTENT_MODEL,"expiresOn");
    
}
