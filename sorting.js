class Sorting{
    static randomElement(max, min){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static randomArray(size){
        if(size <= 0){
            return [];
        }  
        else{
            const array = Sorting.randomArray(size - 1);
            array.push(Sorting.randomElement(20, -10));
            return array;
        }
    }

    static swap(array, a, b){
        [array[a], array[b]] = [array[b], array[a]];
    }

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
    
    static mergeSort(array){
        if(array.length < 2)
            return array;
        
        let middle = Math.floor(array.length / 2), 
            left = Sorting.mergeSort(array.slice(0, middle)),
            right = Sorting.mergeSort(array.slice(middle));

        return Sorting.#merge(left, right);
    }

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

        while(lastElement > 0){
            Sorting.swap(array, lastElement, 0)
            Sorting.#heapify(array, 0, lastElement--);
        }

        return array
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
            Sorting.swap(array, largest, i)
            Sorting.#heapify(array, largest, max)
        }
    }

    static #buildMaxHeap(array){
        let i = Math.floor(array.length / 2) - 1;

        while (i >= 0)
            Sorting.#heapify(array, i--, array.length)

        return array
    }
}

let x = Sorting.randomArray(15)

console.log(x, Sorting.heapSort([...x]))
