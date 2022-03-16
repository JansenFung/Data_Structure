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

        while (i >= 0)
            Select.#minHeapify(array, i--, array.length);
    }

    static #extractMin(array){
        let lastElement = array.length - 1;

        Select.#swap(array, 0, lastElement);
        array.pop();
        Select.#minHeapify(array, 0, array.length);
    }

    static maxHeapSelect(array, k){
        Select.#buildMaxHeap(array, k);

        for (let i = k; i < array.length; i++) {
            if (array[i] < array[0]) {
               array[0] = array[i];
               Select.#maxHeapify(array, 0, k);
            }
        }

        return array[0];
    }

    static #maxHeapify(array, i, max){
        let left = 2 * i + 1,
            right = 2 * i + 2,
            largest = i;

        if (left < max && array[left] > array[largest])
            largest = left;

        if (right < max && array[right] > array[largest])
            largest = right;

        if(largest != i){
            Select.#swap(array, i, largest);
            Select.#maxHeapify(array, largest, max);
        }
    }

    static #buildMaxHeap(array, size){
        let i = Math.floor(size / 2) - 1;

        while (i >= 0)
            Select.#maxHeapify(array, i--, size);
    }

    static countingSelect(array, k){
        let max = Math.max.apply(Math, array),
            min = Math.min.apply(Math, array),
            range = max - min + 1,
            count = Array.from({length: range}, (v, i) => 0);

        for (let i = 0; i < array.length; i++) 
            count[array[i] - min]++;

        for (let i = 1; i < count.length; i++)
            count[i] += count[i - 1];

        for (let i = array.length - 1; i >= 0; i--) {
            if(count[array[i] - min] == k)
                return array[i];

            count[array[i] - min]--;
        }
    }
}

const x = Select.randomArray(12);
console.log(Sorting.insertionSort([...x]), Select.countingSelect([...x], 7));