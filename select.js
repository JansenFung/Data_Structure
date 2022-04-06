import Sorting from "./sorting.js"

class Select{
    /**
     * Gerenates a random number
     * 
     * @param {number} max 
     * @param {number} min 
     * @returns a random number between the given range
     */
    static randomElement(max, min){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Gerenates a random array
     * @param {number} size 
     * @returns a array with random elements
     */
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

    /**
     * Use destructing assignment ot swap 2 elements
     * 
     * @param {*} array 
     * @param {number} a index
     * @param {number} b index
     */
    static #swap(array, a, b){
        [array[a], array[b]] = [array[b], array[a]];
    }

    /**
     * Sort the array using O(nlogn) algorithms and select kth element
     * 
     * @param {*} array 
     * @param {number} k kth smallest element 
     * @returns the kth smallest element
     */
    static nLogNSelect(array, k){
        array = Sorting.mergeSort(array);
        return array[k-1];
    }

    /**
     * Gerenates a Min Heap and calls extractMin Method k-1 times
     * O(n + klogn)
     * 
     * @param {*} array 
     * @param {number} k kth smallest element
     * @returns the kth smallest element
     */
    static minHeapSelect(array, k){
        Select.#buildMinHeap(array);

        for (let i = 0; i < k - 1; i++)
            Select.#extractMin(array);

        return array[0];
    }

    /**
     * Heapify the array
     * 
     * @param {*} array 
     * @param {number} i starting index 
     * @param {number} max size of the max heap 
     */
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

    /**
     * Build a Min Heap
     * 
     * @param {*} array 
     */
    static #buildMinHeap(array){
        let i = Math.floor(array.length / 2) - 1;

        while (i >= 0)
            Select.#minHeapify(array, i--, array.length);
    }

    /**
     * Remove the smallest item from a Min Heap
     * 
     * @param {*} array 
     */
    static #extractMin(array){
        let lastElement = array.length - 1;

        Select.#swap(array, 0, lastElement);
        array.pop();
        Select.#minHeapify(array, 0, array.length);
    }

    /**
     * Make a Max Heap from 0 to k-1th element, then starting from kth element, compares it to the root of a Max Heap
     * If the kth element is less than the root, replace the root with the kth element
     * O(k + (n-k)logk)
     * 
     * @param {*} array 
     * @param {number} k kth smallest element 
     * @returns the kth smallest element
     */
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

    /**
     * Heapify the array
     * 
     * @param {*} array 
     * @param {number} i starting index
     * @param {number} max size of the max heap
     */
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

    /**
     * Build a Max Heap
     * 
     * @param {*} array 
     * @param {number} size 
     */
    static #buildMaxHeap(array, size){
        let i = Math.floor(size / 2) - 1;

        while (i >= 0)
            Select.#maxHeapify(array, i--, size);
    }

    /**
     * Similar to Counting Sort
     * O(n + range)
     * 
     * @param {*} array 
     * @param {number} k kth smallest element 
     * @returns the kth smallest element
     */
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

    /**
     * Average: O(n)
     * Worst: O(n^2) if always pick either the smallest or the largest element as a pivot
     * 
     * @param {*} array 
     * @param {number} k kth smallest element
     * @param {number} left starting index
     * @param {number} right ending index
     * @returns the kth smallest element
     */
    static quickSelect(array, k, left = 0, right = array.length - 1){
        let pivot = Select.#partition(array, left, right);

        if (k - 1 == pivot)
            return array[pivot];
        else if (k - 1 < pivot)
            return Select.quickSelect(array, k, left, pivot - 1);
        else
            return Select.quickSelect(array, k, pivot + 1, right);
    }

    /**
     * Partition an array with a pivot
     * 
     * @param {*} array 
     * @param {number} left starting index
     * @param {number} right ending index
     * @returns a partition array
     */
    static #partition(array, left, right){
        let pivotValue = array[right],
            pivotLoc = left;

        for (let i = left; i <= right; i++) {
           if (array[i] < pivotValue)
            Select.#swap(array, i, pivotLoc++);
        }

        Select.#swap(array, pivotLoc, right);

        return pivotLoc;
    }

    static kthSmallest(array, k, left = 0, right = array.length - 1){
        if (k >= 0 && k <= right - left + 1){
            let n = right - left + 1,
                medians = new Array(Math.floor((n + 4) / 5));

                

            for (let i = 0; i < n / 5; i++) {
                if (left + (i + 1) * 5 < right)
                    medians[i] = Select.#findMedian(array.slice(left + i * 5, left + (i + 1) * 5));
                else
                    medians[i] = Select.#findMedian(array.slice(left + i * 5, right + 1));
            }

            let medOfMedians = Select.#findMedian(medians),
                pos = Select.#kthSmallestPartition(array, medOfMedians, left, right);

            console.log(medians, medians.length)
            
            if(k - 1 == pos - left)
                return array[pos];
            else if (k - 1 < pos - left)
                return Select.kthSmallest(array, k, left, pos - 1);
            else 
                return Select.kthSmallest(array, k-pos+left-1, pos + 1, right);
        }
    }

    static #findMedian(array){
        array.sort((a,b) => a - b);

        return array[Math.floor(array.length / 2)];
    }

    static #kthSmallestPartition(array, med, left, right){
        let pivotLoc = left;
        
        for (let i = left; i <= right; i++) {
            if (array[i] === med)
                Select.#swap(array, i, right);
                break;
        }

        for (let i = left; i <= right; i++) {
            if (array[i] < med)
                Select.#swap(array, i, pivotLoc++);
        }
        
        Select.#swap(array, right, pivotLoc);

        return pivotLoc;
    }
}