function randomArray(n){
    if(n <= 0){
        return [];
    }
    else{
        const array = randomArray(n-1);
        array.push(Math.floor(Math.random() * (10-(-10))+1) + (-10));
        return array;
    }
}

function swap(array, a, b){
    [array[a], array[b]] = [array[b], array[a]];
}
/////////////////////////////////////////////

function partition(array, left, right){
    let pivot = array[right];
    let pivotLoc = left;

    for(let i = left; i <= right; i++){
        if(array[i] < pivot)
            swap(array, i, pivotLoc++);
    }

    swap(array, right, pivotLoc);

    return pivotLoc;
}

function quickSelect(array, k, left=0, right=array.length-1){
    let pivot = partition(array, left, right);

    if(k-1 === pivot)
        return array[pivot];
    else if(k-1 < pivot)
        return quickSelect(array, k, left, pivot-1);
    else
        return quickSelect(array, k, pivot+1, right);
}
/////////////////////////////////////////////
function minHeapSelect(arr, k){
    buildMinHeap(arr);

    for (let i = 0; i < k-1; i++) {
        extractMin(arr);      
    }

    return arr[0];
}

function buildMinHeap(arr){
    let i = Math.floor(arr.length/2) - 1;

    while(i >= 0){
        minHeapify(arr, i--, arr.length);
    }
}

function minHeapify(arr, i, max){
    let left = 2 * i + 1,
        right = 2 * i + 2,
        min = i;
    
    if(left < max && arr[left] < arr[min])
        min = left;
    if(right < max && arr[right] < arr[min])
        min = right;
    
    if(min != i){
        swap(arr, i, min);
        minHeapify(arr, min, max);
    }
}

function extractMin(arr){
    swap(arr, 0, arr.length-1);
    arr.pop();
    minHeapify(arr, 0, arr.length);
}
/////////////////////////////////////////////
function maxHeapSelect(arr, k){
    buildMaxHeap(arr, k);

    for (let i = k; i < arr.length; i++) {
        if(arr[i] < arr[0]){
            arr[0] = arr[i];
            maxHeapify(arr, 0, k);
        }      
    }

    return arr[0];
}

function buildMaxHeap(arr, size){
    let i = Math.floor(size/2) - 1;

    while(i >= 0){
        maxHeapify(arr, i--, size);
    }
}

function maxHeapify(arr, i, max){
    let left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;
    
    if(left < max && arr[left] > arr[largest])
        largest = left;
    if(right < max && arr[right] > arr[largest])
        largest = right;
    
    if(largest != i){
        swap(arr, i, largest);
        maxHeapify(arr, largest, max);
    }
}
/////////////////////////////////////////////
function findMedian(arr){
    arr.sort((a,b)=>a-b);

    return arr[Math.floor(arr.length/2)];
}

function _partition(arr, l, r, med){
    // Search for the median in arr[l..r] and move it to end
    for(let i = l; i <= r; i++){
        if(arr[i] === med){
            swap(arr, i, r);
            break;
        }
    }

    let medLoc = l;

    //parition around the median
    for (let j = l; j <= r; j++){
        if(arr[j] < med)
            swap(arr, j, medLoc++);       
    }

    swap(arr, medLoc, r);

    return medLoc;
}

function kthSmallest(arr, k, l=0, r=arr.length-1){

    // If k is smaller than number of elements in array, done
    if(k >= 0 && k <= r-l+1){
        let n = r-l+1; // Number of elements in arr[l..r]
        let i;

        // Divide arr[] in groups of size 5,
        // find median of every group
        // and store it in median[] array.
        let median = new Array(Math.floor((n+4)/5));

        for(i = 0; i < n/5; i++){
            if(l + (i + 1) * 5 < r)
                median[i] = findMedian(arr.slice(l + i * 5, l + (i + 1) * 5));
            // For last group with less than 5 elements
            else
                median[i] = findMedian(arr.slice(l + i * 5, r+1));
        }

        let medOfMedian = findMedian(median);

        // Partition the array around a median
        let pos = _partition(arr, l, r, medOfMedian);

        if(pos-l === k-1)
            return arr[pos];
        else if(k-1 < pos-l)
            return kthSmallest(arr, k, l, pos-1);
        else
            return kthSmallest(arr, k-pos+l-1, pos+1, r);
    }
}
/////////////////////////////////////////////
function countingSelect(arr, k){
    let max = Math.max.apply(Math, arr),
        min = Math.min.apply(Math, arr),
        range = max - min + 1,
        count = Array.from({length: range}, (_,i) => 0);

    for (let i = 0; i < arr.length; i++)
        count[arr[i] - min]++;

    for (let i = 1; i < count.length; i++)
        count[i] += count[i-1];

    //count[i] indicates kth element of the array
    for (let i = 0; i < arr.length; i++) {
        if(count[arr[i] - min] === k)
            return arr[i];    

        count[arr[i] - min]--;
    }

    return -1;
}
/////////////////////////////////////////////
function selectionSort(array){
    for(let i = 0; i < array.length-1; i++){
        let smallest = i;
        for(let j = i + 1; j < array.length; j++){
            if(array[j] < array[smallest])
                smallest = j;
        }

        swap(array, i, smallest);
    }

    return array;
}

let arr1 = randomArray(10);

let arr2 = randomArray(10);

let arr3 = randomArray(10);

let arr4 = randomArray(10);

let arr5 = randomArray(10);

console.log([...arr1], selectionSort([...arr1]), quickSelect(arr1, 4));

console.log([...arr2], selectionSort([...arr2]), minHeapSelect(arr2, 6));

console.log([...arr3], selectionSort([...arr3]), maxHeapSelect(arr3, 3));

console.log([...arr4], selectionSort([...arr4]), kthSmallest(arr4, 8));

console.log([...arr5], selectionSort([...arr5]), countingSelect(arr5, 2));