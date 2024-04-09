import Counter from "../models/Counter.js"

export default async (name, opts) => {
    let value
    let counter = await Counter.findOne({name: name}).session(opts.session)
    if (!counter) {
        console.log(`Creating new counter named ${name}`)
        counter = new Counter({name: name})
    }
    console.log(`Updating counter ${name}`)
    counter.value = counter.value + 1
    value = counter.value
    console.log(`Saving`)
    await counter.save()
    console.log(`Done`)
    return value
}
