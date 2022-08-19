document.addEventListener("scroll", function (e) {
    console.log(e)
});

// let numWorks = document.documentElement.dataset[0]

let options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
}

let observers = []
let hasLeft = [] // boolean array

for(let i=0;i<numWorks;i++) hasLeft.push(false)

let callback = (entries, observer) => {
    entries.forEach((entry, i) => {
        let num = parseInt(entry.target.id.substr(entry.target.id.length-1))
        // console.log(num)
        // console.log(entry.isIntersecting)
        // console.log(entry.target.getBoundingClientRect())

        if (entry.isIntersecting && hasLeft[num]) { // it is entering the page from the left
            console.log(num+" is entering")

            showText(num)
            hasLeft[num] = false
        } else if (!entry.isIntersecting && entry.target.getBoundingClientRect().x < 0) { // it is leaving the page
            console.log(num+" has left");

            showText(num+1)
            hasLeft[num] = true;
        }
    });
};

let labels = []
for(let i=0;i<numWorks;i++) {
    labels.push(document.querySelector("#text-"+i))
}

function showText(num) {
    console.log("showing "+num)
    num = Math.min(Math.max(num, 0), numWorks-1) // clamping

    for(let i=0;i<numWorks;i++) {
        if (i!=num) {
            if (!labels[i].classList.contains("hidden-label")) {
                labels[i].classList.add("hidden-label")
            }
        }
    }
    labels[num].classList.remove("hidden-label")

    console.log(labels[num].classList)
}

for(let i=0;i<numWorks;i++) {
    let target = document.querySelector('#pixel-' + i);
    let observer = new IntersectionObserver(callback, options);
    observer.observe(target);

    console.log(target)

    observers.push(observer)
}