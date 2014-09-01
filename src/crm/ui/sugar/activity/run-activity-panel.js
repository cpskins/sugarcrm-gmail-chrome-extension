/**
 * @fileoverview About this file
 */

ydn.app.msg.Manager.addConsumer(new ydn.app.msg.ConsoleStatusBar());
ydn.msg.initPipe('popup');
ydn.debug.log('ydn.crm', 'finer');
var panel, sugar;
var user = ydn.crm.ui.UserSetting.getInstance();
var inj = document.querySelector('.inj');
inj.style.maxWidth = '20em';
var div = document.getElementById('activity-root');
ydn.crm.shared.logger.info('activity panel test')

ydn.crm.sugar.model.GDataSugar.list().addCallbacks(function(models) {
  for (var i = 0; i < models.length; i++) {
    sugar = /** @type {ydn.crm.sugar.model.GDataSugar} */ (models[i]);
    document.getElementById('gmail-account').textContent = sugar.getGDataAccount();
    panel = new ydn.crm.ui.sugar.activity.Panel(sugar);
    panel.render(div);
    break;
  }
}, function(e) {
  throw e;
});
