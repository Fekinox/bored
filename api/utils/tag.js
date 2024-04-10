
import Tag from "../models/Tag.js";

// Gets the tag from the database if it exists, but if it doesn't it creates
// the new tag and returns it.
export async function getTag(tag) {
    let name
    let namespace = undefined

    let tokens = tag.split(":")
    switch(tokens.length) {
    case 1:
        name = tokens[0]
        break;
    case 2:
        name = tokens[1]
        namespace = tokens[0]
        break;
    default:
        throw new Error("invalid format for tag")
    }

    let query = {
        name: name,
        namespace: namespace || "none"
    }

    let theTag = await Tag.findOne(query)
    if (!theTag) {
        let newTag = new Tag(query)
        await newTag.save()
        return newTag
    }
    return theTag
}

export async function getAllTags(tagList) {
    const splitTags = tagList.split(",")
    return Promise.all(
        splitTags.map((tag) => {
            return getTag(tag.trim())
        })
    )
}
