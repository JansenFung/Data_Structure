class Search{
    static randomElement(max, min){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static randomArray(size){
        if(size <= 0){
            return [];
        }
        else{
            const array = Search.randomArray(size - 1);
            array.push(Search.randomElement(20, -10));
            return array;
        }
    }

    static linearSearch(array, target){
        for (let i = 0; i < array.length; i++) {
            if(array[i] === target)
                return i;
        }

        return -1;
    }
}