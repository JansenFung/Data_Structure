import {Sorting} from './sorting.js';

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

    //while loop
    static binarySearch(array, target, startIndex = 0, endingIndex = array.length - 1){
        while(startIndex <= endingIndex){
            let middle = Math.floor((startIndex + endingIndex) / 2);

            if(array[middle] === target)
                return middle;
            else if (target < array[middle])
                endingIndex = middle - 1;
            else
                startIndex = middle + 1;
        }

        return -1;
    }

    //Recursive approach
    static recursiveBinarySearch(array, target, startIndex = 0, endingIndex = array.length - 1){
        if (startIndex > endingIndex)
            return -1;
        
        let middle = Math.floor((startIndex + endingIndex) / 2);

        if(array[middle] === target)
            return middle;
        else if (target < array[middle])
            return Search.recursiveBinarySearch(array, target, startIndex, middle - 1);
        else
            return Search.recursiveBinarySearch(array, target, middle + 1, endingIndex);
    }
}

let x = Search.randomArray(10);

console.log(Sorting.quickSort(x), Search.recursiveBinarySearch(x, 6))