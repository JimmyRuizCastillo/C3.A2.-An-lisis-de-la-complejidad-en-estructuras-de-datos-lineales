import LinkedList from "../models/LinkedList.js"
let list = new LinkedList()
//let root = document.getElementById("list-bussines")
const rute = "./src/controllers/bussines.json"
//console.time("medicion 1")
let startTime = 0
let finalTime = 0


all()

function all(){
    fetch(rute)
    .then(response => response.json())
    .then(data => {
        //En esta parte unicamente se muestran los primeros 100 registros
        /*
        for (let x=0;x<10;x++) {
            let name = data[x].name
            lista.add(name)
        }
        */

        let arrayData = [];

        startTime = performance.now()
        for (let i = 0; i < 10000; i++) {
            list.add(data[i].name)
        }
        /*
        data.forEach(element => {
            list.add(element)
        });
        */
        finalTime = performance.now()

        let finalTimeLindkedInsert = finalTime - startTime

        //let finalTimeLindkedInsert = console.time("LinkedList Insertion") - console.timeEnd("LinkedList Insertion")

        startTime = performance.now()
        list.bubbleSort()
        finalTime = performance.now()

        let finalTimeLinkedBubble = finalTime - startTime

        //let finalTimeLinkedBubble = console.time("LinkedList Insertion") - console.timeEnd("LinkedList Insertion")

        startTime = performance.now()
        list.mergeSort()
        finalTime = performance.now()
        let finalTimeLinkedMerge = finalTime - startTime

        //let finalTimeLinkedMerge = console.time("LinkedList Insertion") - console.timeEnd("LinkedList Insertion")

        startTime = performance.now()
        list.radixSort()
        finalTime = performance.now()
        let finalTimeLinkedRadix = finalTime - startTime

        //let finalTimeLinkedRadix = console.time("LinkedList Insertion") - console.timeEnd("LinkedList Insertion")

        startTime = performance.now()
        for (let i = 0; i < 10000; i++) {
            arrayData.push(data[i].name)
        }
        finalTime = performance.now()

        let finalTimeArrayInsert = finalTime - startTime

        //let finalTimeArrayInsert = console.time("LinkedList Insertion") - console.timeEnd("LinkedList Insertion")

        startTime = performance.now()
        bubbleSort(arrayData)
        finalTime = performance.now()
        let finalTimeArrayBubble = finalTime - startTime

        //let finalTimeArrayBubble = console.time("LinkedList Insertion") - console.timeEnd("LinkedList Insertion")

        startTime = performance.now()
        mergeSort(arrayData)
        finalTime = performance.now()
        let finalTimeArrayMerge = finalTime - startTime

        //let finalTimeArrayMerge = console.time("LinkedList Insertion") - console.timeEnd("LinkedList Insertion")

        startTime = performance.now()
        radixSort(arrayData)
        finalTime = performance.now()
        let finalTimeArrayRadix = finalTime - startTime
        graphInsert(finalTimeLindkedInsert.toFixed(3), finalTimeArrayInsert.toFixed(3), "Insert LinkedList", "Insert Array")
        graphBubble(finalTimeLinkedBubble.toFixed(3), finalTimeArrayBubble.toFixed(3), "Bubble LinkedList", "Bubble Array")
        graphMerge(finalTimeLinkedMerge.toFixed(3), finalTimeArrayMerge.toFixed(3), "Merge LinkedList", "Merge Array")
        graphRadix(finalTimeLinkedRadix.toFixed(3), finalTimeArrayRadix.toFixed(3), "Radix LinkedList", "Radix Array")

        //let finalTimeArrayRadix = console.time("LinkedList Insertion") - console.timeEnd("LinkedList Insertion")

    }).catch(err => console.log(err))
}

function graphInsert(timeLinkedList, timeArray, lblLinkedList, lblArray){
    let id = document.getElementById("insertChart")
    graph("Tiempo de ejecucion Insertar",id,timeLinkedList, timeArray, lblLinkedList, lblArray)
}

function graphBubble(timeLinkedList, timeArray, lblLinkedList, lblArray){
    let id = document.getElementById("bubbleChart")
    graph("Tiempo de ejecucion Burbuja",id,timeLinkedList, timeArray, lblLinkedList, lblArray)
}

function graphMerge(timeLinkedList, timeArray, lblLinkedList, lblArray){
    let id = document.getElementById("mergeChart")
    graph("Tiempo de ejecucion Merge",id,timeLinkedList, timeArray, lblLinkedList, lblArray)
}

function graphRadix(timeLinkedList, timeArray, lblLinkedList, lblArray){
    let id = document.getElementById("radixChart")
    graph("Tiempo de ejecucion Radix",id,timeLinkedList, timeArray, lblLinkedList, lblArray)
}

//console.timeEnd("medicion 1")

function graph(tittle,id,finalTimeLindkedInsert, finalTimeArrayInsert, lblLinkedList, lblArray) {
    const ctx = id

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [lblLinkedList,lblArray],
            datasets: [{
                label: tittle,
                data: [finalTimeLindkedInsert,finalTimeArrayInsert],
                backgroundColor:['rgba(25, 111, 61, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => value + "ms"
                      }
                }
            }
        }
    })
}


function bubbleSort(array) {
    let len = array.length
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]]
            }
        }
    }
    return array
}

function mergeSort(array) {
    if (array.length <= 1) return array

    const mid = Math.floor(array.length / 2)
    const left = mergeSort(array.slice(0, mid))
    const right = mergeSort(array.slice(mid))

    return merge(left, right)
}

function merge(left, right) {
    let result = []
    let lIndex = 0
    let rIndex = 0
    while (lIndex < left.length && rIndex < right.length) {
        if (left[lIndex] < right[rIndex]) {
            result.push(left[lIndex])
            lIndex++
        } else {
            result.push(right[rIndex])
            rIndex++
        }
    }

    return result.concat(left.slice(lIndex)).concat(right.slice(rIndex))
}

function radixSort(array) {
    const maxNum = Math.max(...array)
    let digit = 1
    while (digit <= maxNum) {
        let buckets = [...Array(10)].map(() => [])
        for (let num of array) {
            buckets[Math.floor(num / digit) % 10].push(num)
        }
        array = [].concat(...buckets)
        digit *= 10
    }
    return array
}

function searchArray(array, target) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === target) {
            return array[i]
        }
    }
    return null
}