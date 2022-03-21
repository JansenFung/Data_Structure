 export class Sorting{

    /**
     * Generate a random number
     * 
     * @param {number} max Maximum number
     * @param {number} min Minimum number
     * @returns {number} a random number
     */
    static randomElement(max, min){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Generate a random array
     * 
     * @param {number} n size of an array
     * @returns a random array of size equals to n
     */
    static randomArray(n){
        if(n <= 0){
            return [];
        }  
        else{
            const array = Sorting.randomArray(n - 1);
            array.push(Sorting.randomElement(20, -10));
            return array;
        }
    }

    /**
     * Uses Destructure assiginment to swap array element A and B
     * 
     * @param array
     * @param {number} a index of element A
     * @param {number} b index of element B
     */
    static swap(array, a, b){
        [array[a], array[b]] = [array[b], array[a]];
    }

    /**
     * O(n^2)
     * Stable
     * 
     * @param array 
     * @returns a sorted array 
     */
    static selectionSort(array){
        for (let i = 0; i < array.length - 1; i++) {
            let smallest = i;

            for (let j = i + 1; j < array.length; j++) {
                if(array[j] < array[smallest])
                    smallest = j;
            }

            Sorting.swap(array, smallest, i);   
        }

        return array;
    }

    /**
     * O(n^2)
     * Stable
     * 
     * @param array 
     * @returns a sorted array 
     */
    static insertionSort(array){
        for (let i = 1; i < array.length; i++) {
            let current = array[i],
                j;

            for (j = i - 1; j >= 0 && array[j] > current; j--) {
                array[j + 1] = array[j];
            }
            
            array[j + 1] = current;
        }

        return array;
    }

    /**
     * Best case: O(n) if the array is sorted
     * Worst case: O(n^2)
     * Stable
     * 
     * @param array 
     * @returns a sorted array 
     */
    static bubbleSort(array){
        for (let i = 0; i < array.length - 1; i++) {
            let isSwap = false;

            for (let j = 0; j < array.length - i - 1; j++) {
                if(array[j] > array[j + 1]){
                    Sorting.swap(array, j , j + 1);
                    isSwap = true;
                }
            }

            if(!isSwap)
                break;
        }

        return array
    }

    /**
     * O(n + k) where n is number of elements and k is the range of numbers
     * Stable
     * 
     * @param array 
     * @returns a sorted array 
     */
    static countingSort(array){
        let max = Math.max.apply(Math, array),
            min = Math.min.apply(Math, array),
            range = max - min + 1,
            count = Array.from({length: range}, (v, i) => 0),
            output = Array.from({length: array.length}, (v, i) => 0);

        for (let i = 0; i < array.length; i++) 
           count[array[i] - min]++;
        
        for (let i = 1; i < count.length; i++) 
            count[i] += count[i - 1]

        for (let i = array.length - 1; i >= 0; i--) {
            output[count[array[i] - min] - 1] = array[i]
            count[array[i] - min]--
        }

        for (let i = 0; i < array.length; i++) 
            array[i] = output[i]

        return array
    }
    
    /**
     * Divide and conquer algorithm 
     * O(nlogn)
     * Stable
     * 
     * @param array 
     * @returns a sorted array
     */
    static mergeSort(array){
        if(array.length < 2)
            return array;
        
        let middle = Math.floor(array.length / 2), 
            left = Sorting.mergeSort(array.slice(0, middle)),
            right = Sorting.mergeSort(array.slice(middle));

        return Sorting.#merge(left, right);
    }

    /**
     * 
     * @param arrA 1st array 
     * @param arrB 2nd array
     * @returns a sorted comnined array of 2 arrays
     */
    static #merge(arrA, arrB){
        let i = 0,
            j = 0,
            array = [];

        while (i < arrA.length && j < arrB.length){
            if (arrA[i] < arrB[j])
                array.push(arrA[i++]);
            else
                array.push(arrB[j++]);
        }

        while (i < arrA.length)
            array.push(arrA[i++]);

        while (j < arrB.length)
            array.push(arrB[j++]);

        return array;
    }

    static heapSort(array){
        Sorting.#buildMaxHeap(array);

        let lastElement = array.length - 1;

        while (lastElement > 0){
            Sorting.swap(array, lastElement, 0)
            Sorting.#heapify(array, 0, lastElement--);
        }

        return array;
    }

    static #heapify(array, i, max){
        let left = 2 * i + 1,
            right = 2 * i + 2,
            largest = i;

        if (left < max && array[left] > array[largest])
            largest = left;
        if (right < max && array[right] > array[largest])
            largest = right;  
            
        if (largest != i){
            Sorting.swap(array, largest, i);
            Sorting.#heapify(array, largest, max);
        }
    }

    static #buildMaxHeap(array){
        let i = Math.floor(array.length / 2) - 1;

        while (i >= 0)
            Sorting.#heapify(array, i--, array.length);

        return array;
    }

    static notOptimizeQuickSort(array){
        if (array.length < 2)
            return array;
        
        let middle = Math.floor(array.length / 2),
            equal = [],
            smaller = [],
            greater = [];

        //or uses array.filter()
        array.forEach(num => {
            if (num > array[middle])
                greater.push(num);
            else if (num < array[middle])
                smaller.push(num);
            else
                equal.push(num);
        });

        return [...Sorting.notOptimizeQuickSort(smaller), ...equal, ...Sorting.notOptimizeQuickSort(greater)];
    }

    static quickSort(array, left = 0, right = array.length - 1){
        if (left >= right)
            return array;

        let pivot = Sorting.#partition(array, left, right)

        if (left < pivot)
            Sorting.quickSort(array, left, pivot - 1);
        if (right > pivot)
            Sorting.quickSort(array, pivot + 1, right);

        return array
    }

    static #findPivot(array, left, right){
        let middle = Math.floor((left + right) / 2);

        if (array[right] < array[left])
            Sorting.swap(array, left, right)

        if (array[middle] < array[left])
            Sorting.swap(array, left, middle);

        if (array[right] < array[middle])
            Sorting.swap(array, right, middle)

        return middle;
    }

    static #partition(array, left, right){
        let pivot = Sorting.#findPivot(array, left, right),
            i = left + 1,
            j = right - 1,
            pivotValue = array[pivot];

        Sorting.swap(array, pivot, j);

        pivot = j;

        while (i <= j){
            while (array[i] < pivotValue)
                i++;
            
            while (array[j] >= pivotValue)
                j--;

            if (i <= j)
                Sorting.swap(array, i++, j--);
        }

        if (i >= j && i < pivot)
            Sorting.swap(array, i, pivot)
        
        return i;
    }
}