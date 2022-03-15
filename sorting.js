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
}