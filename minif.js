/**
  * @param {Array} data – массив CSS классов
  */
module.exports = function(data) {
    /* алфавит для построения css-классов */
    var letterAlph = 'abcdefghjiklmnopqrstuvwxyz';

    /* длина этого алфавита */
    var CONST_LEN_ALPH = letterAlph.length;

    /* ассоциативный вспомогательный массив, чтобы посчитать, сколько
    раз встречается каждый класс в исходном файле;*/
    var freqClassHash = {};

    /* объект freqClassHash удобен, чтобы посчитать частоту встречаемости
    класса, но не удобен для сортировки, поэтому ввожу freqClassArray,
    который будет результатом преобразования freqClassHash в массив строк */
    var freqClassArray = [];

    /* объект, который вернет данный модуль, когда заполнит */
    var newfreqClassHash = {};

    /* функция генерирует новое имя класса по алгоритму, описанному в Readme */
    function createNewClassName(_item, _index)
    {
        var i = _index, k = 0;
        var str = "";

        do
        {
            k = i % CONST_LEN_ALPH;
            str = letterAlph.charAt(k) + str;
            i = Math.floor((i - k) / CONST_LEN_ALPH);
        } while (i != 0);

        return str;
    }

    /* функция для сортировки двух строк вида "число%строка" */
    function compareStrWithNum(_str1, _str2)
    {
        var a = parseInt(_str1.substring(0, _str1.indexOf('%')));
        var b = parseInt(_str2.substring(0, _str2.indexOf('%')));

        return (a < b) ? 1 : (a > b) ? -1 : 0;
    }

    /* считаю частоту встречаемости каждого класса в исходном файле */
    data.forEach(function(_value, _index) {
        freqClassHash[_value] = (_value in freqClassHash) ? freqClassHash[_value] + 1 : 1;

    });

    /*
    преобразовываю каждый элемент массива freqClassHash вида:
    {
        класс: частота
    }
    в строку вида "частота%класс". В качестве разделителя использую "%",
    т.к. этот символ не может встречаться в названии css класса по
    спецификации */
    var freqClassKeys = Object.keys(freqClassHash);

    freqClassArray = freqClassKeys.map(function(_key)
    {
        return freqClassHash[_key] + "%" + _key;
    });

    /* сортирую массив freqClassArray по-убыванию. Сортировка происходит
    по-убыванию числа в каждой строчки до "%" */
    freqClassArray.sort(compareStrWithNum);

    /* теперь каждый элемент вида "частота%класс" -> "класс" и генерируем
    для него новое имя */
    freqClassArray.forEach(function(item, index) {
        var itemKey = item.substring(item.indexOf("%") + 1);

        newfreqClassHash[itemKey] = createNewClassName(item, index);
    });

    return newfreqClassHash;
};

