import moment from 'moment';
import 'moment/dist/locale/zh-cn';
moment.locale('zh-cn');

export function injectDataToObject(target, data) {
  data.forEach((item) => {
    target[item.value] = item.label;
    item.children && injectDataToObject(target, item.children);
  });
}

export function formatDate(timeStamp) {
  return moment(+timeStamp).fromNow();
}

export function formatLocaleTime(timeStamp) {
  return moment(+timeStamp).format('YYYY-MM-DD HH:mm:ss');
}
