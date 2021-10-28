function randomArray(){
  let array = [];
  let n = 10;
  let max = 100;
  let min = -50;
  let randomNum;

  while(n > 0){
     randomNum = Math.floor(Math.random() * (max-min+1) + min);
     array.push(randomNum);
     n--;
  }

  return array;
}

function swap(array, a, b){
    [array[a], array[b]] = [array[b], array[a]];
  }
//////////////////////////////////////////////////////
function selectionSort(array){
  for(let i = 0; i < array.length - 1; i++){
    let min = i;
    
    for(let j = i + 1; j < array.length; j++){
      if(array[j] < array[min])
          min = j
    } 
    
    swap(array, min, i);
    }

    return array;
  }
  
console.log(`SelectionSort: ${selectionSort(randomArray())}`);
//////////////////////////////////////////////////////
function insertionSort(array){
  for(let i = 1; i < array.length; i++){
    let current = array[i];
    
    for(var j = i-1; j>=0 && array[j] > current; j--)
      array[j+1] = array[j];
    
    array[j+1] = current;
    }
  
    return array;
}

console.log(`InsertionSort: ${insertionSort(randomArray())}`);  
//////////////////////////////////////////////////////
function bubbleSort(array){
  for(let i = 0; i < array.length; i++){
    let isSwap = false;
    
    for(let j = 0; j < array.length-1-i; j++){
      if(array[j] > array[j+1]){
        swap(array, j, j+1);
        isSwap = true;
      }
    }

    if(!isSwap)
      break;
  }

  return array;
}

console.log(`BubbleSort: ${bubbleSort(randomArray())}`);  
//////////////////////////////////////////////////////
function mergeSort(array){
  if(array.length < 2){
    return array;
  }

  let middle = Math.floor(array.length/2);

  let left = mergeSort(array.slice(0,middle));
  let right = mergeSort(array.slice(middle));

  return merge(left, right);
}

function merge(arr1, arr2){
  let i = 0;
  let j = 0;
  let mergeArray = [];

  while(i < arr1.length && j < arr2.length){
    if(arr1[i] < arr2[j]){
      mergeArray.push(arr1[i++]);
    }
    else{
      mergeArray.push(arr2[j++]);
    }  
  }

  while(i < arr1.length){
    mergeArray.push(arr1[i++]);
  }

  while(j < arr2.length){
    mergeArray.push(arr2[j++]);
  }

  return mergeArray;
}

console.log(`MergeSort: ${mergeSort(randomArray())}`); 
//////////////////////////////////////////////////////
function findPivot(array, leftMost, rightMost){
  let middle = Math.floor((leftMost+rightMost)/2);
  
    if(array[rightMost] < array[leftMost])
      swap(array, rightMost, leftMost);
        
    if(array[middle] < array[leftMost])
      swap(array,middle,leftMost);

    if(array[rightMost] < array[middle])
      swap(array, middle, rightMost);

  return middle;
}

function partition(array, left, right){
  let pivot = findPivot(array, left, right);
  let i = left + 1;
  let j = right - 1;
  let pivotValue = array[pivot];

  swap(array, pivot, j);

  pivot = j;

  while(i <= j){
    while(array[i] < pivotValue)
      i++;
    
    while(array[j] >= pivotValue)
      j--;
    
    if(i<=j)
      swap(array, i++, j--);
  }

  if(i>=j && i < pivot)
    swap(array,i,pivot);
  
  return i;
}

function quickSort(array, left, right){
  if(left >= right){
    return array;
  }

  let pivot = partition(array, left, right);

  if(left < pivot-1)
    quickSort(array, left, pivot-1);
  
  if(right > pivot+1)
    quickSort(array, pivot+1, right);
  
  return array;
}

console.log(`QuickSort: ${quickSort(randomArray(), 0 , 9)}`); 
//////////////////////////////////////////////////////
function notOptimizeQuickSort(array){
  let middle = Math.floor(array.length/2);
  let equal = [];
  let smaller = [];
  let greater = [];

  if(array.length < 2)
    return array;
  
  array.forEach(element => {
    if(element > array[middle]){
      greater.push(element);
    }
    else if(element < array[middle]){
      smaller.push(element);
    }
    else{
      equal.push(element);
    }
  });

  return [...notOptimizeQuickSort(smaller), ...equal, ...notOptimizeQuickSort(greater)];
}

console.log(`Not Optimize QuickSort: ${notOptimizeQuickSort(randomArray())}`); 