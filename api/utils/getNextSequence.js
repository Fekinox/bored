import Counter from "../models/Counter.js"

export default async (name, opts) => {
    let value
    let counter = await Counter.findOne({name: name}).session(opts.session)
    if (!counter) {
        counter = new Counter({name: name})
    }
    counter.value = counter.value + 1
    value = counter.value
    await counter.save(opts.session)
    return value
}
