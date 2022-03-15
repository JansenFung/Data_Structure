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
}

let x = Sorting.randomArray(15)

console.log(x, Sorting.countingSort([...x]))
