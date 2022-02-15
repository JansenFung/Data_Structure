const list = [1,3,4,10,21,45,53,67,88,99,120,212];

function linearSearch(array, target){
    for(let i = 0; i < array.length; i++){
        if(array[i] === target)
            return i;
    }

    return -1;
}
/////////////////////////////////////////////
function binarySearch(array, target, starting=0, ending=array.length-1){
    if(starting > ending){
        return -1;
    }

    let middle = Math.floor((starting+ending)/2);

    if(array[middle] === target){
        return middle;
    }
    else if(target < array[middle]){
        return binarySearch(array,target,starting,middle-1);
    }
    else{
        return binarySearch(array,target,middle+1,ending);
    }
}
/////////////////////////////////////////////
function binarySearch2(array, target, starting, ending){
    while(starting <= ending){
        let middle = Math.floor((starting+ending)/2);

        if(array[middle] === target){
            return middle;
        }
        else if(target < array[middle]){
            ending = middle-1;
        }
        else{
            starting = middle+1;
        }
    }

    return -1;
}
/////////////////////////////////////////////
function jumpSearch(array, target){
    let prev = 0,
        size = array.length,
        step = Math.sqrt(size);

    while(array[Math.min(step,size)-1] < target){
        prev = step;
        step += Math.sqrt(size);

        if(prev >= size)
            return -1;
    }

    while(array[prev] < target){
        prev++;

        if(prev === Math.min(step,size))
            return -1;
    }

    if(array[prev] === target)
        return prev;
    
    return -1;
}
/////////////////////////////////////////////

function ternarySearch(array, target, starting=0, ending=array.length-1){
    if(starting > ending)
        return -1;
    
    let mid1 = starting + Math.floor((ending-starting)/3);
    let mid2 = ending - Math.floor((ending-starting)/3);

    if(array[mid1] === target)
        return mid1;
    if(array[mid2] === target)
        return mid2;
    else if(target < array[mid1])
        return ternarySearch(array, target, starting, mid1-1);
    else if(target > array[mid2])
        return ternarySearch(array, target, mid2+1, ending);
    else
        return ternarySearch(array, target, mid1+1, mid2-1);
}
/////////////////////////////////////////////

function exponentialSearch(array, target){
    if(array[0] === target)
        return 0;

    let i = 1;
    let size = array.length;

    while(i < size && array[i] <= target)
        i *= 2;

    return binarySearch(array, target, i/2, Math.min(i, size-1));
}
/////////////////////////////////////////////

function interpolationSearch(array, target, low = 0, hi = array.length-1){
    let pos;

    if(low <= hi && array[low] <= target && array[hi] >= target){
        pos = low + Math.floor(((hi-low)/(array[hi]-array[low])) * (target-array[low]));
        
        if(array[pos] === target)
            return pos;
        else if(target < array[pos])
            return interpolationSearch(array, target, lo, pos-1);
        else
            return interpolationSearch(array, target, pos+1, hi);
    }

    return -1;
}

let arr = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610];

console.log(linearSearch(arr,8));
console.log(binarySearch(arr,1));
console.log(ternarySearch(arr,377));
console.log(exponentialSearch(arr, 55));
console.log(jumpSearch(arr, 610));
console.log(interpolationSearch(arr, 233))