function getRandomNumber(min, max) {
    if (min < 0) {
        console.log('Внимание ошибка! Введите только положительные числа.');
    }


    let number = Math.floor(Math.random() * max) + min; 

    if (max <= min) {
        console.log('Внимание! Проверьте правильно ли указан диапазон чисел.');
        number = Math.floor(Math.random() * min) + max;
    };

    return number;

};

getRandomNumber(10, 700);