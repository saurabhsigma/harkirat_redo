function resolveAfter2Seconds(){
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve("resolved");
        }, 10000);
    });
}

async function asyncCall(params) {
    console.log("Calling");
    const result= await resolveAfter2Seconds();
    console.log(result);
}

asyncCall();


// 1. Callbacks
function fetchData(callback) {
    setTimeout(() => {
        const data = "Data received!";
        callback(data);
    }, 2000);
}

fetchData((result) => {
    console.log(result); // Outputs: Data received!
});


// 2. Promises
const fetchDataPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true; // Simulating success or failure
            if (success) {
                resolve("Data received!");
            } else {
                reject("Error fetching data.");
            }
        }, 2000);
    });
};

// Using the Promise
fetchDataPromise()
    .then(result => {
        console.log(result); // Outputs: Data received!
    })
    .catch(error => {
        console.error(error);
    });



// 3. Async/Await

const fetchDataAsync = async () => {
    try {
        const result = await fetchDataPromise(); // Await the promise
        console.log(result); // Outputs: Data received!
    } catch (error) {
        console.error(error);
    }
};

// Call the async function
fetchDataAsync();


// Example Combining All Three

// Callback Example
function fetchDataWithCallback(callback) {
    setTimeout(() => {
        callback("Data received from callback!");
    }, 2000);
}

fetchDataWithCallback(result => console.log(result));

// Promise Example
function fetchDataWithPromise() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Data received from promise!");
        }, 2000);
    });
}

fetchDataWithPromise().then(result => console.log(result));

// Async/Await Example
async function fetchDataWithAsync() {
    const result = await fetchDataWithPromise();
    console.log(result); // Outputs: Data received from promise!
}

fetchDataWithAsync();
// done wtih async and sync with callbacks and promises