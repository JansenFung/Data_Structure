import {Sorting} from './sorting.js';

class Select{
    static randomElement(max, min){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static randomArray(size){
        if(size <= 0){
            return [];
        }
        else{
            const array = Select.randomArray(size - 1);
            array.push(Select.randomElement(20, -10));
            return array;
        }
    }

    //sort the array using O(nlogn) algorithms and select kth element
    static nLogNSelect(array, k){
        array = Sorting.mergeSort(array);
        return array[k-1];
    }
}

const x = Select.randomArray(10);
console.log(Sorting.insertionSort([...x]), Select.nLogNSelect([...x], 4));