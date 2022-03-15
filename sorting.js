class Sorting{
    static randomElement(max, min){
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static randomArray(size){
        if(size <= 0){
            return []
        }  
        else{
            const array = Sorting.randomArray(size - 1)
            array.push(Sorting.randomElement(20, -10))
            return array
        }
    }

    static swap(array, a, b){
        [array[a], array[b]] = [array[b], array[a]]
    }

    static selectionSort(array){
        for (let i = 0; i < array.length - 1; i++) {
            let smallest = i

            for (let j = i + 1; j < array.length; j++) {
                if(array[j] < array[smallest])
                    smallest = j
            }

            Sorting.swap(array, smallest, i)      
        }

        return array
    }
}
