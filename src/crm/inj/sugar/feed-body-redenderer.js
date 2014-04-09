/**
 * @fileoverview Feed panel show relevant record from the SugarCRM relative to
 * current gmail inbox contact.
 *
 * This provides adding, linking and syncing.
 */


goog.provide('ydn.crm.inj.sugar.FeedBodyRenderer');
goog.require('goog.ui.ControlRenderer');
goog.require('ydn.crm.inj.sugar.FeedPanel');



/**
 * Contact sidebar panel.
 * @constructor
 * @struct
 * @extends {goog.ui.ContainerRenderer}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.inj.sugar.FeedBodyRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.inj.sugar.FeedBodyRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(ydn.crm.inj.sugar.FeedBodyRenderer);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.inj.sugar.FeedBodyRenderer.DEBUG = false;


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.inj.sugar.FeedBodyRenderer.prototype.logger =
    goog.debug.Logger.getLogger('ydn.crm.inj.sugar.FeedBodyRenderer');


/**
 * @const
 * @type {string}
 */
ydn.crm.inj.sugar.FeedBodyRenderer.CSS_CLASS = 'feed-panel';


/** @return {string} */
ydn.crm.inj.sugar.FeedBodyRenderer.prototype.getCssClass = function() {
  return ydn.crm.inj.sugar.FeedBodyRenderer.CSS_CLASS;
};


/**
 * @const
 * @type {string}
 */
ydn.crm.inj.sugar.FeedBodyRenderer.CSS_CLASS_HEADER = 'feed-header';


/**
 * @const
 * @type {string}
 */
ydn.crm.inj.sugar.FeedBodyRenderer.CSS_CLASS_CONTENT = 'feed-body';


/**
 * @inheritDoc
 */
ydn.crm.inj.sugar.FeedBodyRenderer.prototype.createDom = function(x) {
  var root = goog.base(this, 'createDom', x);
  var ctrl = /** {ydn.crm.inj.sugar.FeedPanel} */ (x);
  var model = /** @type {ydn.crm.inj.sugar.model.GDataSugar} */ (ctrl.getModel());
  var dom = ctrl.getDomHelper();
  var ele_header = dom.createDom('div', ydn.crm.inj.sugar.FeedBodyRenderer.CSS_CLASS_HEADER);
  var ele_content = dom.createDom('div', ydn.crm.inj.sugar.FeedBodyRenderer.CSS_CLASS_CONTENT);
  root.appendChild(ele_header);
  root.appendChild(ele_content);
  ctrl.setElementInternal(root);

  var title = dom.createDom('div', 'feed-title');
  ele_header.appendChild(title);

  for (var i = 0; i < ydn.crm.sugar.PANEL_MODULES.length; i++) {
    var name = ydn.crm.sugar.PANEL_MODULES[i];
    var panel = ctrl.popPanel(name);
    ctrl.addChild(panel, true);
  }

  return root;
};


/**
 * Refresh view due to change in model.
 * @param {Element} root
 * @param {ydn.crm.inj.sugar.model.GDataSugar} model
 */
ydn.crm.inj.sugar.FeedBodyRenderer.prototype.refresh = function(root, model) {
  var contact = model.getContactModel();
  goog.style.setElementShown(root, !!contact);

};




