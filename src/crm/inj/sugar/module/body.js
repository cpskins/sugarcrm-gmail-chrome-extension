/**
 * @fileoverview Record module panel for Accounts, Contacts, Leads, etc.
 *
 * This module provide adding, linking and syncing.
 */


goog.provide('ydn.crm.inj.sugar.module.Body');
goog.require('goog.dom.forms');
goog.require('ydn.crm.inj.sugar.module.BodyRenderer');
goog.require('ydn.crm.inj.sugar.module.Field');
goog.require('ydn.crm.sugar');
goog.require('ydn.crm.sugar.model.Module');



/**
 * Contact sidebar panel.
 * @param {ydn.crm.sugar.model.Module} model
 * @param {goog.ui.ContainerRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Container}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.inj.sugar.module.Body = function(model, opt_renderer, opt_dom) {
  var renderer = opt_renderer || ydn.crm.inj.sugar.module.BodyRenderer.getInstance(); // needed?
  goog.base(this, goog.ui.Container.Orientation.VERTICAL, renderer, opt_dom);
  this.setModel(model);
};
goog.inherits(ydn.crm.inj.sugar.module.Body, goog.ui.Container);


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.inj.sugar.module.Body.prototype.logger =
    goog.debug.Logger.getLogger('ydn.crm.inj.sugar.module.Body');


/**
 * @define {boolean} debug flag.
 */
ydn.crm.inj.sugar.module.Body.DEBUG = goog.DEBUG;


/**
 * @return {ydn.crm.inj.sugar.module.BodyRenderer}
 * @override
 */
ydn.crm.inj.sugar.module.Body.prototype.getRenderer;


/**
 * @return {ydn.crm.sugar.model.Module}
 * @override
 */
ydn.crm.inj.sugar.module.Body.prototype.getModel;


/**
 * @inheritDoc
 */
ydn.crm.inj.sugar.module.Body.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.getHandler().listen(this.getModel(), [ydn.crm.sugar.model.events.Type.RECORD_CHANGE,
    ydn.crm.sugar.model.events.Type.NEW_GDATA], this.refresh);
};


/**
 * refresh.
 */
ydn.crm.inj.sugar.module.Body.prototype.refresh = function(e) {
  var model = this.getModel();
  var root = this.getElement();
  var renderer = this.getRenderer();
  var record = model.getRecord();
  if (ydn.crm.inj.sugar.module.Body.DEBUG) {
    window.console.log('module body ' + model.getModuleName() + ' refresh for ' + e.type, record);
  }
  if (record) {
    goog.style.setElementShown(root, true);
  } else {
    goog.style.setElementShown(root, false);
    return;
  }

  for (var i = 0; i < this.getChildCount(); i++) {
    var child = this.getChildAt(i);
    if (child instanceof ydn.crm.inj.sugar.module.Group) {
      var g = /** @type {ydn.crm.inj.sugar.module.Group} */ (child);
      g.refresh();
    } else if (child instanceof ydn.crm.inj.sugar.module.group.Address) {
      var a = /** @type {ydn.crm.inj.sugar.module.group.Address} */ (child);
      a.refresh();
    }
  }

};

goog.ui.registry.setDefaultRenderer(ydn.crm.inj.sugar.module.Body,
    ydn.crm.inj.sugar.module.BodyRenderer);

