// TimeAgo

//$('time').timeAgo({
//    'lang' : 'ru'
//});

var TimeAgo = (function($, undefined) {

    var dateNow = new Date();
    var timeNow = parseInt((+dateNow) / 1000);
    var timeZoneOffset = dateNow.getTimezoneOffset() * 60;

    var defaultLang = 'ru';

    var $elements = null;

    var getLang = function(elSettings) {
        var lang = elSettings == undefined || elSettings.lang == undefined ? TimeAgo.lang : elSettings.lang;
        return TimeAgo.strings[lang] != undefined ? lang : defaultLang;
    };

    var getStrings = function(elSettings) {
        var lang = elSettings == undefined || elSettings.lang == undefined ? TimeAgo.lang : elSettings.lang;
        var strings = TimeAgo.strings;
        //if (elSettings != undefined && elSettings.strings != undefined) {
        //    strings = $.extend(strings, elSettings.strings);
        //}
        return strings[lang] != undefined ? strings[lang] : strings[defaultLang];
    };

    var plural = function(number, words, texts) {
        if (number < words.length) {
            return words[number];
        }
        var cases = [2, 0, 1, 1, 1, 2];
        var number_100 = number % 100;
        var number_10 = number % 10;
        var result = texts[(number_100 > 4 && number_100 < 20) ? 2 : cases[(number_10 < 5) ? number_10 : 5] ];
        return result.replace('#', number);
    };

    var TimeAgo = {};
    TimeAgo.lang = 'ru';
    TimeAgo.strings = {
        'ru': {
            ago_hours:               ["# час назад", "# часа назад", "# часов назад"],
            //ago_hours_words:         ["час назад", "два часа назад", "три часа назад", "четыре часа назад", "пять часов назад"],
            ago_hours_words:         {0.5 : "полчаса назад",
                                      1 : "час назад", 2 : "два часа назад", 3 : "три часа назад", 4 : "четыре часа назад", 5 : "пять часов назад",
                                      1.5  : "полтора часа назад", 2.5 : "два с половиной часа назад"/*, 3.5 : "три с половиной часа назад", 4.5 : "четыре с половиной часа назад", 5.5 : "пять с половиной часов назад"*/},

            ago_minutes:             ["# минуту назад", "# минуты назад", "# минут назад"],
            //ago_minutes_words:       ["минуту назад", "две минуты назад", "три минуты назад", "4 минуты назад", "5 минут назад"],
            ago_minutes_words:       {0.5 : "пол минуты назад",
                                      1 : "минуту назад", 2 : "две минуты назад", 3 : "три минуты назад", 4 : "четыре минуты назад", 5 : "пять минут назад",
                                      1.5 : "полторы минуты назад", 2.5 : "две с половиной минуты назад"/*, 3.5 : "три с половиной минуты назад", 4.5 : "четыре с половиной минуты назад", 5.5 : "пять с половиной минут назад"*/},

            ago_seconds:             ["# секунду назад", "# секунды назад", "# секунд назад"],
            ago_seconds_words:       [],//["только что", "две секунды назад", "три секунды назад", "четыре секунды назад", "пять секунд назад"],

            future_hours:            ["через # час", "через # часа", "через # часов"],
            //future_hours_words:      ["через час", "через два часа", "через три часа", "через четыре часа", "через пять часов"],
            future_hours_words:      {0.5 : "через пол часа",
                                      1 : "через час", 2 : "через два часа", 3 : "через три часа", 4 : "через четыре часа", 5: "через пять часов",
                                      1.5 : "через полтора часа", 2.5 : "через два с половиной часа"/*, 3.5 : "через три с половиной часа", 4.5 : "через четыре с половиной часа", 5.5 : "через пять с половиной часов"*/},

            future_minutes:          ["через # минуту", "через # минуты", "через # минут"],
            //future_minutes_words:    ["через минуту", "через две минуты", "через три минуты", "через 4 минуты", "через 5 минут"],
            future_minutes_words:    {0.5 : "через полминуты",
                                      1 : "через минуту", 2: "через две минуты", 3 : "через три минуты", 4 : "через 4 минуты", 5 : "через 5 минут",
                                      1.5 : "через полторы минуты", 2.5 : "через две с половиной минуты"/*, 3.5 : "через три с половиной минуты", 4.5 : "через четыре с половиной минуты", 5.5 : "через пять с половиной минут"*/},

            future_seconds:          ["через # секунду", "через # секунды", "через # секунд"],
            future_seconds_words:    [],//["сейчас", "через две секунды", "через три секунды", "через четыре секунды", "через пять секунд"],

            now: 'только что',
            today_at: 'сегодня в #',
            tomorrow_at: 'завтра в #',
            yesterday_at: 'вчера в #',

            months: [['январь', 'января'], ['февраль', 'февраля'], ['март', 'марта'], ['апрель', 'апреля'], ['май', 'мая'], ['июнь', 'июня'], ['июль', 'июля'], ['август', 'августа'], ['сентябрь', 'сентября'], ['октябрь', 'октября'], ['ноябрь', 'ноября'], ['декабрь', 'декабря']],

            formatDateTime: function (dt, date, time) {
                var year = dt.getFullYear();
                var month = dt.getMonth();
                var day = dt.getDate();
                var hours = dt.getHours();
                var minutes = dt.getMinutes();

                var monthT = this.months[month];

                var curYear = (dateNow.getFullYear());

                var ret = [];

                if (date) {
                    ret.push(day);
                    ret.push(monthT[1]);
                    if (curYear != year) {
                        ret.push(year);
                    }
                }

                if (time) {
                    ret.push(hours + ':' + (minutes < 10 ? '0' : '') + minutes);
                }

                return ret.join(' ');
            }
        }
    };
    TimeAgo.updateInterval = 5000;
    TimeAgo.update = function() {
        dateNow = new Date();
        timeNow = parseInt((+dateNow) / 1000);
        timeZoneOffset = dateNow.getTimezoneOffset() * 60;
        //timeNow -= cur.tsDiff;

        var needUpdateCache = false;

        if ($elements == null) {
            TimeAgo.updateCache();
        }

        $elements.each(function () {
            var $el = $(this);
            needUpdateCache = TimeAgo.updateElement($el)
        });

        if (needUpdateCache) {
            TimeAgo.updateCache();
        }
    };
    TimeAgo.updateElement = function($el) {
        if ($el.hasClass('timeago-updated') == false) {
            return true;
        }

        var needUpdateCache = false;

        var lang = $el.data('timeAgoLang');
        var strings = TimeAgo.strings[lang];

        var timeRow = parseInt($el.attr('timestamp'));
        var diff = timeNow - timeRow;
        var timeText = $el.attr('local-datetime');

        var time = $el.attr('local-time');
        if (!time) return;
        time = time.length > 5 ? time.substr(0, time.length - 3) : time;

        $el.removeClass('seconds');
        $el.removeClass('minutes');
        $el.removeClass('hours');
        $el.removeClass('today');
        $el.removeClass('yesterday');
        $el.removeClass('future');
        $el.removeClass('tomorrow');

        var day = Math.floor((timeRow - timeZoneOffset) / 86400);
        var dayNow = Math.floor((timeNow) / 86400);
        var diffDay = dayNow - day;

        var v, v05;

        if (diff < 0) {
            diff = diff * -1;
            $el.addClass('future');

            if (diff < 60) {
                timeText = plural(diff, strings.future_seconds_words, strings.future_seconds);
                $el.addClass('seconds');
            } else if (diff < 3600) {
                v = Math.ceil(diff / 60) - 1;
                v05 = (Math.round((diff / 60) * 2) / 2);
                timeText = strings.future_minutes_words[v05] != undefined ?
                           strings.future_minutes_words[v05] :
                           (strings.future_minutes_words[v] != undefined ? strings.future_minutes_words[v] : plural(v, [], strings.future_minutes));
                $el.addClass('minutes');
            } else if (diff < 4 * 3600) {
                v = Math.ceil(diff / 3600) - 1;
                v05 = (Math.round((diff / 3600) * 2) / 2);
                timeText = strings.future_hours_words[v05] != undefined ?
                           strings.future_hours_words[v05] :
                           (strings.future_hours_words[v] != undefined ? strings.future_hours_words[v] : plural(v, [], strings.future_hours));
                $el.addClass('hours');
            } else if (diff < 48 * 3600) {
                if (Math.abs(diffDay) == 0) {
                    timeText = strings.today_at.replace('#', time);//'сегодня в ' +
                    $el.addClass('today');
                } else if (Math.abs(diffDay) == 1) {
                    timeText = strings.tomorrow_at.replace('#', time);//'завтра в ' +
                    $el.addClass('tomorrow');
                }
                $el.removeClass('timeago-updated');
                $el.data('timeAgoLang', undefined);
                needUpdateCache = true;
            } else {
                $el.removeClass('timeago-updated');
                $el.data('timeAgoLang', undefined);
                needUpdateCache = true;
            }

        } else if (diff < 1) {
            timeText = strings.now;
            $el.addClass('now');
        } else if (diff < 60) {
            timeText = plural(diff, strings.ago_seconds_words, strings.ago_seconds);
            $el.addClass('seconds');
        } else if (diff < 3600) {
            v = Math.ceil(diff / 60) - 1;
            v05 = (Math.round((diff / 60) * 2) / 2);
            timeText = strings.ago_minutes_words[v05] != undefined ?
                       strings.ago_minutes_words[v05] :
                       (strings.ago_minutes_words[v] != undefined ? strings.ago_minutes_words[v] : plural(v, [], strings.ago_minutes));
            $el.addClass('minutes');
        } else if (diff < 4 * 3600) {
            v = Math.ceil(diff / 3600) - 1;
            v05 = (Math.round((diff / 3600) * 2) / 2);
            timeText = strings.ago_hours_words[v05] != undefined ?
                       strings.ago_hours_words[v05] :
                       (strings.ago_hours_words[v] != undefined ? strings.ago_hours_words[v] : plural(v, [], strings.ago_hours));
            $el.addClass('hours');
        } else if (diff < 48 * 3600) {
            if (diffDay == 0) {
                timeText = strings.today_at.replace('#', time);//'сегодня в ' +
                $el.addClass('today');
            } else if (diffDay == 1) {
                timeText = strings.yesterday_at.replace('#', time);//'вчера в ' +
                $el.addClass('yesterday');
            }
            $el.removeClass('timeago-updated');
            $el.data('timeAgoLang', undefined);
            needUpdateCache = true;
        } else {
            $el.removeClass('timeago-updated');
            $el.data('timeAgoLang', undefined);
            needUpdateCache = true;
        }

        //timeText += ' : ' + diff;

        if ($el.text() != timeText) {
            $el.text(timeText);
            return needUpdateCache;
        }

        return false;
    };
    TimeAgo.updateCache = function() {
        $elements = $('time.auto-timeago.timeago-updated');
    };

    var methods = {
        init : function(settings) {
            return this.each(function(){
                var $el = $(this);

                var d = new Date($el.attr('datetime'));
                if (d == 'Invalid Date') {
                    return;
                }

                var lang = getLang(settings);
                var strings = TimeAgo.strings[lang];
                $el.data('timeAgoLang', lang);

                var localDateTime = strings.formatDateTime(d, true, true);
                var localTime = strings.formatDateTime(d, false, true);

                $el.attr('local-datetime', localDateTime);
                $el.attr('local-time', localTime);

                $el.addClass('timeago-updated');
                $el.addClass('timeago-init');

                var title = $el.attr('title');
                var titleNew = title ? title.replace('%d', localDateTime) : localDateTime;
                if (title == titleNew) {
                    titleNew = localDateTime;
                }
                $el.attr('title', titleNew);

                $el.text(localDateTime);

                TimeAgo.updateElement($el);
                TimeAgo.updateCache();
            });
        }
    };

    $.fn.timeAgo = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.timeAgo');
        }
    };

    setInterval(
        function() {
            TimeAgo.update.call(TimeAgo);
        },
        TimeAgo.updateInterval
    );

    return TimeAgo;
}) (jQuery);

var initTimeAgo = function () {
    $('time.auto-timeago:not(.timeago-init)').timeAgo();
};

$(function() {
    //setTimeout(initTimeAgo, 100);
});