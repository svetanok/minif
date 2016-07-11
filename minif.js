/**
  * @param {Array} data – массив CSS классов
  */
module.exports = function(data) {

    var hash = []; /* вспомогательный хеш для полсчета частоты встречаемости */
    var newHash = {};
    var alAlph = 'abcdefghjiklmnopqrstuvwxyz';
    CONST_LEN_ALPH = 26;

    function findFrequency(value, index)
    {
        /* этот варивнт считает число вхождения каждого класса в исходном
        json-файле*/
        /*hash[value] = (value in hash)?hash[value]+1:1;*/

        if (hash.indexOf(value)==-1)
            hash.push(value);
    }

    function createNewClassName(item, index)
    {
        var str='';

        var k = index % CONST_LEN_ALPH;
        var iteration = (index - k)/CONST_LEN_ALPH;

        if (iteration>0)
        {
            for (j = 0; j < iteration; j++)
            {
                str=str+alAlph.charAt(j);
            }
        }
        str=str+alAlph.charAt(k);
        newHash[item]=str;
    }

    data.forEach(findFrequency);
    hash.forEach(createNewClassName);

    return newHash;
};

