package com.someco;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.alfresco.repo.node.NodeServicePolicies;
import org.alfresco.repo.policy.Behaviour.NotificationFrequency;
import org.alfresco.repo.policy.JavaBehaviour;
import org.alfresco.repo.policy.PolicyComponent;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.namespace.NamespaceService;
import org.alfresco.service.namespace.QName;
import org.alfresco.util.GUID;
import org.apache.log4j.Logger;

import com.ibm.icu.util.Calendar;
import com.someco.model.SomeCoModel;

/**
 * 
 * @author bhagya
 *
 */
public class PublishWithShortUrlBehavior implements NodeServicePolicies.OnAddAspectPolicy {

	private final static Logger LOG = Logger.getLogger(PublishWithShortUrlBehavior.class);

	public PublishWithShortUrlBehavior(final NodeService nodeService, final PolicyComponent policyComponent) {
		this.nodeService = nodeService;
		this.policyComponent = policyComponent;
	}

	private final PolicyComponent policyComponent;
	private final NodeService nodeService;

	@Override
	public void onAddAspect(NodeRef nodeRef, QName aspectTypeQName) {
		if (!nodeService.exists(nodeRef)) {
			LOG.error("Executed behaviour on non existing node: " + nodeRef);
			return;
		}
		LOG.warn("OnAddAsepct for " + nodeRef + " with aspect " + aspectTypeQName);
		createNewShortLinkItem(nodeRef);
	}

	/**
	 * Creates properties related to a short link.
	 * 
	 * @param nodeRef
	 */
	private void createNewShortLinkItem(NodeRef nodeRef) {
		LOG.warn("Creating new shortlink item....");
		Map<QName, Serializable> nodeProps = new HashMap<QName, Serializable>();
		String generatedShortLink = (String) GUID.generate();

		Date today = new Date();

		nodeProps.put(SomeCoModel.PROP_PUBLISHED, today);
		nodeProps.put(SomeCoModel.PROP_IS_ACTIVE, true);

		Calendar expiryDate = Calendar.getInstance();

		// initial expiry date is after 30 days from the published date
		expiryDate.add(Calendar.DATE, 30);

		nodeProps.put(SomeCoModel.PROP_EXPIRES_ON, expiryDate.getTime());
		nodeProps.put(SomeCoModel.PROP_SHORT_LINK, generatedShortLink);

		LOG.warn("Shortlink URL [" + generatedShortLink + "] generated, and added to the node properties.");
		nodeService.addProperties(nodeRef, nodeProps);
	}

	public void init() {
		this.policyComponent.bindClassBehaviour(QName.createQName(NamespaceService.ALFRESCO_URI, "onAddAspect"), SomeCoModel.ASPECT_SC_WEBABLE, new JavaBehaviour(this,
				"onAddAspect", NotificationFrequency.FIRST_EVENT));

		LOG.info("Initializing PublishWithShortUrlBehavior completed.");
	}

}
