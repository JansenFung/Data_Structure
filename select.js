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

    static #swap(array, a, b){
        [array[a], array[b]] = [array[b], array[a]];
    }

    //sort the array using O(nlogn) algorithms and select kth element
    static nLogNSelect(array, k){
        array = Sorting.mergeSort(array);
        return array[k-1];
    }

    static minHeapSelect(array, k){
        Select.#buildMinHeap(array);

        for (let i = 0; i < k - 1; i++)
            Select.#extractMin(array);

        return array[0];
    }

    static #minHeapify(array, i, max){
        let left = 2 * i + 1,
            right = 2 * i + 2,
            smallest = i;

        if (left < max && array[left] < array[smallest])
            smallest = left;

        if (right < max && array[right] < array[smallest])
            smallest = right;

        if(smallest != i){
            Select.#swap(array, i, smallest);
            Select.#minHeapify(array, smallest, max);
        }
    }

    static #buildMinHeap(array){
        let i = Math.floor(array.length / 2) - 1;

        while (i >= 0){
            Select.#minHeapify(array, i--, array.length);
        }
    }

    static #extractMin(array){
        let lastElement = array.length - 1;

        Select.#swap(array, 0, lastElement);
        array.pop();
        Select.#minHeapify(array, 0, array.length);
    }
}

const x = Select.randomArray(12);
console.log(Sorting.insertionSort([...x]), Select.minHeapSelect([...x], 7));