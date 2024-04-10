import Counter from "../models/Counter.js"

export default async (name, opts) => {
    let value
    let counter = await Counter.findOne({name: name}).session(opts.session)
    if (!counter) {
        throw new Error("undefined counter")
    }
    counter.value = counter.value + 1
    value = counter.value
    await counter.save(opts.session)
    return value
}

const counters = [
    "post", "file",
]

// Initialize all counters
console.log("Initializing counters")
for (let i = 0; i < counters.length; i++) {
    const counter = await Counter.findOne({name: counters[i]})
    if (counter) { continue }
    console.log(`Initializing counter ${counters[i]}`)
    let newCounter = new Counter({name: counters[i]})
    await newCounter.save()
}
console.log("Done initializing counters")
