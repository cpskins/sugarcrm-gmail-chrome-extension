/**
 * @fileoverview Model change event.
 */

goog.provide('ydn.crm.sugar.model.events');


/**
 * Event types.
 *
 * Note: these event type string are exported.
 * @enum {string}
 */
ydn.crm.sugar.model.events.Type = {
  CONTEXT_DATA_CHANGE: 'context-data-change',
  CONTEXT_GDATA_CHANGE: 'context-gdata-change',
  MODULE_CHANGE: 'module-change', // change in module name
  RECORD_CHANGE: 'record-change', // change in record primary key
  RECORD_UPDATE: 'record-update', // record value changes
  GDATA_CHANGE: 'gdata-change',
  GDATA_UPDATED: 'gdata-updated'
};


/**
 * List of all events dispatched by Sugar model.
 * @const
 * @type {Array.<ydn.crm.sugar.model.events.Type>}
 */
ydn.crm.sugar.model.events.TYPES_SUGAR = [
  ydn.crm.sugar.model.events.Type.CONTEXT_DATA_CHANGE,
  ydn.crm.sugar.model.events.Type.RECORD_CHANGE,
  ydn.crm.sugar.model.events.Type.GDATA_CHANGE
];


/**
 * List of all events dispatched by Module model.
 * @const
 * @type {Array.<ydn.crm.sugar.model.events.Type>}
 */
ydn.crm.sugar.model.events.TYPES_MODULE = [
  ydn.crm.sugar.model.events.Type.MODULE_CHANGE,
  ydn.crm.sugar.model.events.Type.RECORD_CHANGE,
  ydn.crm.sugar.model.events.Type.RECORD_UPDATE
];



/**
 * Event for sugar models.
 * @param {ydn.crm.sugar.model.events.Type} event_type event type.
 * @param {Object=} opt_event_target target.
 * @extends {goog.events.Event}
 * @constructor
 * @struct
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.sugar.model.events.Event = function(event_type, opt_event_target) {
  goog.base(this, event_type, opt_event_target);
};
goog.inherits(ydn.crm.sugar.model.events.Event, goog.events.Event);



/**
 * Event when inbox contact data change.
 * @param {ydn.crm.inj.ContactModel} contact new contact data.
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.sugar.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.sugar.model.events.ContextDataChangeEvent = function(contact, opt_event_target) {
  goog.base(this, ydn.crm.sugar.model.events.Type.CONTEXT_DATA_CHANGE, opt_event_target);
  /**
   * @final
   * @type {ydn.crm.inj.ContactModel}
   */
  this.contact = contact;
};
goog.inherits(ydn.crm.sugar.model.events.ContextDataChangeEvent, ydn.crm.sugar.model.events.Event);



/**
 * Event when inbox contact data change.
 * @param {string} domain
 * @param {ydn.gdata.m8.NewContactEntry} contact new contact data.
 * @param {!Array.<ydn.gdata.m8.ContactEntry>} contacts
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.sugar.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.sugar.model.events.ContextGDataChangeEvent = function(domain, contact, contacts, opt_event_target) {
  goog.base(this, ydn.crm.sugar.model.events.Type.CONTEXT_GDATA_CHANGE, opt_event_target);
  /**
   * @type {string}
   * @final
   */
  this.domain = domain;
  /**
   * Gmail context contact data.
   * @final
   * @type {ydn.gdata.m8.NewContactEntry}
   */
  this.context = contact;
  /**
   * Match contact entry from the database that match with context contact data.
   * @final
   * @type {!Array.<!ydn.gdata.m8.ContactEntry>}
   */
  this.contacts = contacts;
};
goog.inherits(ydn.crm.sugar.model.events.ContextGDataChangeEvent, ydn.crm.sugar.model.events.Event);


/**
 * Pop out GData of relevant module.
 * @param {ydn.crm.sugar.ModuleName} name
 * @return {ydn.gdata.m8.ContactEntry} if contact is available.
 */
ydn.crm.sugar.model.events.ContextGDataChangeEvent.prototype.pop = function(name) {
  for (var i = 0; i < this.contacts.length; i++) {
    var contact = this.contacts[i];
    var xp = contact.getExternalId(ydn.gdata.m8.ExternalId.Scheme.SUGARCRM,
        this.domain, name);
    if (xp) {
      return this.contacts.splice(i, 1)[0];
    }
  }
  return null;
};



/**
 * Event when sugarcrm record change in a module. The update has already being
 * applied at the time of call.
 * @param {*} delta the new value.
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.sugar.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.sugar.model.events.ModuleRecordChangeEvent = function(delta,
                                                              opt_event_target) {
  goog.base(this, ydn.crm.sugar.model.events.Type.RECORD_CHANGE, opt_event_target);

  /**
   * @final
   * @type {*}
   */
  this.delta = delta;
};
goog.inherits(ydn.crm.sugar.model.events.ModuleRecordChangeEvent, ydn.crm.sugar.model.events.Event);



/**
 * Event when sugarcrm record change in a module. The update has already being
 * applied at the time of call.
 * @param {ydn.crm.sugar.ModuleName?} module
 * @param {ydn.crm.sugar.Record} update the new value.
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.sugar.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.sugar.model.events.ModuleChangeEvent = function(module, update,
                                                        opt_event_target) {
  goog.base(this, ydn.crm.sugar.model.events.Type.RECORD_CHANGE, opt_event_target);
  /**
   * @final
   * @type {ydn.crm.sugar.ModuleName?} old module name.
   */
  this.module = module;
  /**
   * @final
   * @type {ydn.crm.sugar.Record}
   */
  this.update = update;
};
goog.inherits(ydn.crm.sugar.model.events.ModuleChangeEvent, ydn.crm.sugar.model.events.Event);



/**
 * Event when sugarcrm record change in a module. The update has already being
 * applied.
 * @param {*} delta
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.sugar.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.sugar.model.events.ModuleRecordUpdatedEvent = function(delta, opt_event_target) {
  goog.base(this, ydn.crm.sugar.model.events.Type.RECORD_UPDATE, opt_event_target);

  /**
   * @final
   * @type {*}
   */
  this.delta = delta;
};
goog.inherits(ydn.crm.sugar.model.events.ModuleRecordUpdatedEvent, ydn.crm.sugar.model.events.Event);



/**
 * Event when gdata contact entry link to the sugarcrm record change in a module.
 * @param {ydn.crm.sugar.model.events.Type} type
 * @param {ydn.gdata.m8.ContactEntry} old_record
 * @param {ydn.gdata.m8.ContactEntry} new_record
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.sugar.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.sugar.model.events.GDataEvent = function(type, old_record, new_record, opt_event_target) {
  goog.base(this, type, opt_event_target);
  /**
   * @final
   * @type {ydn.gdata.m8.ContactEntry}
   */
  this.old_record = old_record;
  /**
   * @final
   * @type {ydn.gdata.m8.ContactEntry}
   */
  this.new_record = new_record;
};
goog.inherits(ydn.crm.sugar.model.events.GDataEvent, ydn.crm.sugar.model.events.Event);



/**
 * Event when GData was changed.
 * @param {ydn.gdata.m8.ContactEntry} old_record
 * @param {ydn.gdata.m8.ContactEntry} new_record
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.sugar.model.events.GDataEvent}
 * @constructor
 * @struct
 */
ydn.crm.sugar.model.events.GDataChangedEvent = function(old_record, new_record, opt_event_target) {
  goog.base(this, ydn.crm.sugar.model.events.Type.GDATA_CHANGE, old_record, new_record, opt_event_target);
};
goog.inherits(ydn.crm.sugar.model.events.GDataChangedEvent, ydn.crm.sugar.model.events.GDataEvent);



/**
 * Event when GData was changed.
 * @param {ydn.gdata.m8.ContactEntry} old_record
 * @param {ydn.gdata.m8.ContactEntry} new_record
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.sugar.model.events.GDataEvent}
 * @constructor
 * @struct
 */
ydn.crm.sugar.model.events.GDataUpdatedEvent = function(old_record, new_record, opt_event_target) {
  goog.base(this, ydn.crm.sugar.model.events.Type.GDATA_UPDATED, old_record, new_record, opt_event_target);
};
goog.inherits(ydn.crm.sugar.model.events.GDataUpdatedEvent, ydn.crm.sugar.model.events.GDataEvent);


