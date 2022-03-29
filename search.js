class Search{

    /**
     * Generates a random number between max and min
     * 
     * @param number max 
     * @param number min 
     * @returns a random number between max and min
     */
    static randomElement(max, min){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Generates an array with random elements
     * 
     * @param number size 
     * @returns an array of size equals to given size
     */
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

    /**
     * O(n)
     * 
     * @param array 
     * @param number target  
     * @returns an index of a target. Otherwise returns -1
     */
    static linearSearch(array, target){
        for (let i = 0; i < array.length; i++) {
            if(array[i] === target)
                return i;
        }

        return -1;
    }


    /**
     * O(logN)
     * whileLoop approach
     * 
     * @param array a sorted array
     * @param number target 
     * @param number startingIndex 
     * @param number endingIndex 
     * @returns an index of a target. Otherwise returns -1 
     */
    static binarySearch(array, target, startingIndex = 0, endingIndex = array.length - 1){
        while(startingIndex <= endingIndex){
            let middle = Math.floor((startingIndex + endingIndex) / 2);

            if(array[middle] === target)
                return middle;
            else if (target < array[middle])
                endingIndex = middle - 1;
            else
                startingIndex = middle + 1;
        }

        return -1;
    }

    /**
     * O(logN)
     * Recursive approach 
     * 
     * @param array a sorted array
     * @param number target 
     * @param number startingIndex 
     * @param number endingIndex 
     * @returns an index of a target. Otherwise returns -1 
     */
    static recursiveBinarySearch(array, target, startingIndex = 0, endingIndex = array.length - 1){
        if (startingIndex > endingIndex)
            return -1;
        
        let middle = Math.floor((startingIndex + endingIndex) / 2);

        if(array[middle] === target)
            return middle;
        else if (target < array[middle])
            return Search.recursiveBinarySearch(array, target, startingIndex, middle - 1);
        else
            return Search.recursiveBinarySearch(array, target, middle + 1, endingIndex);
    }

    /**
     * O(logN)
     * 
     * @param array a sorted array
     * @param number target 
     * @param number startingIndex 
     * @param number endingIndex 
     * @returns an index of a target. Otherwise returns -1 
     */
    static ternarySearch(array, target, startingIndex = 0, endingIndex = array.length - 1){
        if (startingIndex > endingIndex)
            return -1;
        
        let middle1 = startingIndex + Math.floor((endingIndex - startingIndex) / 3),
            middle2 = endingIndex - Math.floor((endingIndex - startingIndex) / 3);

        if(array[middle1] === target)
            return middle1;
        else if(array[middle2] === target)
            return middle2;
        else if (target < array[middle1])
            return Search.ternarySearch(array, target, startingIndex, middle1 - 1);
        else if (target > array[middle2])
            return Search.ternarySearch(array, target, middle2 + 1, endingIndex);
        else
            return Search.recursiveBinarySearch(array, target, middle1 + 1, middle2 - 1);
    }

    static exponentialSearch(array, target){
        if(array[0] == target)
            return 0;

        let i = 1,
            size = array.length;

        while (i < size && array[i] <= target)
            i *= 2;

        return Search.recursiveBinarySearch(array, target, i/2, Math.min(i, size - 1));
    }

    static interpolationSearch(array, target, startIndex = 0, endingIndex = array.length - 1){
        if(startIndex <= endingIndex && array[endingIndex] >= target 
            && array[startIndex] <= target){
                
            let pos = startIndex + 
                        Math.floor(((endingIndex - startIndex) / 
                                    (array[endingIndex] - array[startIndex]))
                                    * (target - array[startIndex]));

            if (array[pos] === target) 
                return pos;
            else if (target < array[pos])
                return Search.interpolationSearch(array, target, startIndex, pos - 1);
            else
                return Search.interpolationSearch(array, target, pos + 1, endingIndex);      
            }

        return -1;
    }

    static jumpSearch(array, target){
        let size = array.length,
            step = Math.sqrt(size),
            prev = 0;

        while (array[Math.min(step, size) - 1] < target) {
            prev = step;
            step += Math.sqrt(size);

            if (prev >= size)
                return -1;
        }

        while (array[prev] < target){
            prev++;

            if(prev === Math.min(step, size))
                return -1;
        }

        if (array[prev] === target)
            return prev;

        return -1;

    }
}