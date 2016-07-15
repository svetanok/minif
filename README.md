# minif
CSS minifier for Yandex FDS

Для решения задачи посчитаем частоту вхождения каждого класса в data.json.

Для этого введем ассоциативный массив (назову для краткости hash):

```js
{
    class1: n1,
    class2: n2
    .....
}
```

Он будет заполнятся пока проходится массив из data.json: берем класс из data (например, class1) и проверяем, если этот класс встречается в hash, то увеличиваем значение соответсвующего поля на 1. А если не встречается, то добавляем в hash со значением 1:

```js
{
    class1: n1+1,
    class2: n2
    class3: 1
    ...
}
```

Посчитав частоты, теперь нужно отсортировать hash в порядке убывания по частотам. Поскольку невозможно сортировать hash — преобразую его в простой массив путем склейки полей каждого элемента с разделителем '%'. Я ввожу такой разделитель потому, что в спецификации по css сказано, что такой символ не может встречаться в названии
css классов.

```js
hashArray =
[
    'n1%class1',
    'n2%class2'
    .....
]
```

К массиву применяем метод sort со своей функцией сортировки, которая "выкусывает" числовую часть до разделителя "%" и сравнивает их. В результате, получим

```js
hashArraySort =
[
    'max_частота%class255',
    'max_частота%class155',
    'какая-то%class44',

    .........
    1%class114
]
```

Теперь будем генерировать новые именя css классов. По-скольку, я не придумала, как красиво ввести в названия классов символы "-", "_"  и цифры, поэтому ограничилась только латинские символы. ((с)Я подумаю об этом завтра)

По-сути, генерация новых классов сводится к задаче перевода index'a (номер обрабатываемого элемента из hashArraySort), который записан в 10-чной системе счисления, в  некое число, которое будет записано в системе счисления с основанием 26 - количество латинских символов. А каждый символ этого некого числа можно получить выбрав однозначно из алфавита латинских символов.

Чтобы перевести число из 10 СС в произвольную, нужно:
1) Делить на основание системы счисления(в нашем случае 26), пока результат не будет меньше основания СС.
2) Остатки от деления выписывать в обратном порядке.

Далее по остаткам выписываем символы латинского алфавита и получаем новые имена классов.
